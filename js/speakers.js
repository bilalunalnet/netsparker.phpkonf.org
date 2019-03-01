var dataURL = '/data/speakers.json';

var App = new Vue({
    el: '#app',
    data: {
        speakers: [],
    },
    mounted() {
        axios.get(
           dataURL
        ).then(
            response => {
                this.speakers = response.data;
            }
        );
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
                schedules.push(sessions.filter(x => x.time === session.time).sort((a, b) => a.track - b.track));
                sessions.splice(sessions.findIndex(e => e.time === session.time),1);
            }
            
            return schedules;
        },
        getRandomSpeakers: function() {
            return _.sampleSize(this.speakers, 6);
        }
    }
});
