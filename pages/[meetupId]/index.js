import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  return (
    // <MeetupDetail
    //   image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
    //   title="First Meetup"
    //   address="Some street 5, 12345 Some City"
    //   description="the first meetup "
    // />
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://G3RGES:Gerges95@cluster0.6bgr7.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    //* if fallback is false, it means all params provided are the only ones available,
    //* if fallback is true, it means there can be some params available but not provided
    fallback: true,
    path: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
    //   [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://G3RGES:Gerges95@cluster0.6bgr7.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  const selectedMeetups = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  //* fetch data for a single meetup
  return {
    props: {
      meetupData: selectedMeetups,
      // {
      //   image:
      //     "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
      //   id: meetupId,
      //   title: "First Meetup",
      //   address: "Some street 5, 12345 Some City",
      //   description: "The first meetup",
      // },
    },
  };
}

export default MeetupDetails;
