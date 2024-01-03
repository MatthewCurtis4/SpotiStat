import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones, faBars, faGuitar} from '@fortawesome/free-solid-svg-icons'

const features = [
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faHeadphones} style={{ color: 'rgb(116, 187, 104)'}}/>,
        title: "Find Your Top Artists and Songs",
        text: "Take a blast to the past and view your top artists and songs from Spotify"
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faBars} style={{ color: 'rgb(116, 187, 104)' }} />,
        title: "Select Between Three Time Periods",
        text: "See data from the past month, past 6 months or your all-time spotify data!"
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faGuitar} style={{ color: 'rgb(116, 187, 104)' }}/>,
        title: "View Your All-Time Top Genres",
        text: "Check out what genres on Spotify you have listened to the most all-time!"
    },
];

const typesOfSearchs = [
    {
        id: 1,
        title: "View Your Top Songs",
        location: "/SongsPage"
    },
    {
        id: 2,
        title: "View Your Top Artists",
        location: "/ArtistsPage"

    },
    {
        id: 3,
        title: "View Your Top Genres",
        location: "/ArtistsPage"

    },
];

const data = {features, typesOfSearchs}; //use if you wanted to export multiple different constants

export default data;