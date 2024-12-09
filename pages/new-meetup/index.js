import NewMeetupForm from "./../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  function addNewMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
  }

  return <NewMeetupForm onAddMeetup={addNewMeetupHandler} />;
}

export default NewMeetupPage;
