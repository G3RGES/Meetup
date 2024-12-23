import { useRouter } from "next/router";
import NewMeetupForm from "./../../components/meetups/NewMeetupForm";

import { Fragment } from "react";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  async function addNewMeetupHandler(enteredMeetupData) {
    // console.log(enteredMeetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>New Meetup</title>
        <meta
          name="description"
          content="Add a new meetup, and create an amazing networking experience,and opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addNewMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
