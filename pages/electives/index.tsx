import { useContext, useState } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import { GetServerSideProps } from "next";

import getAllElectiveSuggestions from "~/services/getAllElectiveSuggestions";
import verifyCookie from "~/services/verifyCookie";
import { UserContext } from "~/context/UserContext";
import { NotificationContext } from "~/context/NotificationContext";
import firebaseAuth from "~/lib/firebaseAuth";
import apiClient from "~/lib/apiClient";
import ElectiveTable from "~/components/ElectiveTable";
import AddElectiveSuggestionDialog from "~/components/AddElectiveSuggestionDialog";
import useToggle from "~/hooks/useToggle";

interface ElectivesProps {
  initElectiveSuggestions: ElectiveSuggestionList;
}

const Electives: React.FC<ElectivesProps> = ({ initElectiveSuggestions }) => {
  const { userSettings } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const [electiveSuggestions, setElectiveSuggestions] = useState<ElectiveSuggestionList>(initElectiveSuggestions);
  const [addElective, toggleAddElective] = useToggle();

  const handleVote = async (electiveId: string, vote: boolean): Promise<void> => {
    const firebaseToken = await firebaseAuth.getToken();
    const response = await apiClient.voteElective(firebaseToken, electiveId, vote);
    if (response.success) {
      const { data } = response;
      setElectiveSuggestions(data);
    } else setNotification({ type: "error", message: "There was an error with counting your vote." });
  };

  return (
    <Container maxWidth="lg">
      <Grid container style={{ marginBottom: 15 }}>
        <Grid item container xs={12} justify="flex-end">
          <Button variant="contained" color="primary" onClick={toggleAddElective} style={{ marginLeft: 25 }}>
            + Add Elective
          </Button>
        </Grid>
      </Grid>
      <AddElectiveSuggestionDialog open={addElective} toggleDialog={toggleAddElective} />
      <ElectiveTable uid={userSettings?.user} electiveSuggestions={electiveSuggestions} handleVote={handleVote} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    // @ts-ignore
    const cookie = req.cookies.mcitcentral;
    await verifyCookie(cookie);
    const initElectiveSuggestions = await getAllElectiveSuggestions();
    return { props: { initElectiveSuggestions, success: true } };
  } catch (e) {
    return { props: {}, redirect: { destination: "/" } };
  }
};

export default Electives;
