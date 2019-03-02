var dataURL = 'data/speakers.json';

var App = new Vue({
    el: '#app',
    data: {
        speakers: [],
        modal: ''
    },
    mounted() {
        axios.get(
           dataURL
        ).then(
            response => {
                this.speakers = response.data;
            }
        );

        axios.get('speaker-modal.html').then(response => {
            this.modal = _.template(response.data);
        });
    },
    methods: {
        getSpeakers: function () {
            return _.sampleSize(this.speakers, 30)
        },
        getSchedule: function () {
            let schedules = [];
            let sessions = [];

            for (const speaker of this.speakers) {
                let track = [];
                for (const session of speaker.sessions) {
                    session.avatar = speaker.avatar;
                    session.name = speaker.name;

                    sessions.push(session);
                }
            }
            
            sessions.sort((a, b) => a.session - b.session);

            for (const session of sessions) {
                let temp = sessions.filter(x => x.time === session.time).sort((a, b) => a.track - b.track)
                if (temp.length === 1) {
                    temp[0].class = "row c-timeline__row c-timeline__row--push-left";
                } else {
                    temp[0].class = "row c-timeline__row c-timeline__row--push-right";
                }
                schedules.push(temp);
                sessions.splice(sessions.findIndex(e => e.time === session.time),1);
            }
            
            return schedules;
        },
        getRandomSpeakers: function() {
            return _.sampleSize(this.speakers, 6);
        },
        openModal: function(speaker) {
            $.fancybox.open(this.modal(speaker),{ 'animationEffect' : 'tube' });
        }
    }
});
