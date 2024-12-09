import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetails";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      title="First Meetup"
      address="Some street 5, 12345 Some City"
      description="the first meetup "
    />
  );
}

export default MeetupDetails;
