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

export async function getStaticPaths() {
  return {
    //* if fallback is false, it means all params provided are the only ones available,
    //* if fallback is true, it means there can be some params available but not provided
    fallback: true,
    path: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  //* fetch data for a single meetup
  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        id: meetupId,
        title: "First Meetup",
        address: "Some street 5, 12345 Some City",
        description: "The first meetup",
      },
    },
  };
}

export default MeetupDetails;
