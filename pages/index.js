import Head from "next/head";
import MeetupList from "./../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is the first Meetup",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 10, 12345 Some City",
    description: "This is the second Meetup",
  },
];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

//* this function runs on the server side not on the client side
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //* fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     //* no need to revalidate the server side
//   };
// }

export async function getStaticProps() {
  //* fetch data from API

  const client = await MongoClient.connect(
    "mongodb+srv://G3RGES:dneUtn0QrLNom8CG@cluster0.6bgr7.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      // meetups: DUMMY_MEETUPS,
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        // description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    //* how many seconds to wait before regenerating for any new data
    //* if the data changes every hour, it would be better to set it to 3600,
    //* but if it changes every second, it would be better to set it to 1
    revalidate: 10,
  };
}

export default HomePage;
