const helpers = {
    getCustomDate(dt) {
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        let hours = dt.getHours();
        let minutes = dt.getMinutes();
        let seconds = dt.getSeconds();
        let day = days[dt.getDay()];
        let month = months[dt.getMonth()];
        let date = this.ordinalSuffixOf(dt.getDate());
        let year = dt.getFullYear();

        let ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        let strTime =
            day +
            ", " +
            month +
            " " +
            date +
            " " +
            year +
            ", " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds +
            " " +
            ampm;
        return strTime;
    },

    ordinalSuffixOf(i) {
        let j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    }
}

export default helpers;