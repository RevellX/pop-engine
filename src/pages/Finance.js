import { useEffect, useState } from "react";
import { EXPENSES_URL, EXPENSES_GROUPS_URL } from "../utils/config";
import { getAuthToken } from "../utils/token";
import Groups from "../components/finance/Groups";
import Expenses from "../components/finance/Expenses";
import Actions from "../components/finance/Actions";
import Main from "../ui/main/MainTop";

function FinancePage() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(EXPENSES_GROUPS_URL, {
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then((response) => {
        setError(null);
        if (response.ok) return response.json();
        throw new Error(
          "Fetchning groups response status " + response.status
        );
      })
      .then((result) => {
        setGroups(result);
        const selGrp = selectedGroup ? selectedGroup : result[0].id;
        if (!selectedGroup) setSelectedGroup(selGrp);
        return fetch(EXPENSES_URL + "/" + selGrp, {
          headers: {
            Authorization: "Bearer " + getAuthToken(),
          },
        });
      })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(
          "Fetching expenses response status " + response.status
        );
      })
      .then((results) => {
        setExpenses(results);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [selectedGroup, refresh]);

  return (
    <Main>
      <Groups
        isLoading={isLoading}
        groups={groups}
        setSelectedGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
        refresh={refreshHandler}
      />
      <Actions
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        refreshHandler={refreshHandler}
        error={error}
        setError={setError}
        selectedGroup={selectedGroup}
      />
      <Expenses isLoading={isLoading} expenses={expenses} />
    </Main>
  );
}

export default FinancePage;
