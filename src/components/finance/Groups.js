import Button from "./Button";
import classes from "./Groups.module.css";

function Groups({
  isLoading,
  groups,
  setSelectedGroup,
  selectedGroup,
}) {
  return (
    <div className={classes.groups}>
      <div className={classes.header}>
        <h4>Grupy</h4>
      </div>
      {groups && (
        <div className={classes.buttons}>
          {groups.map((group) => (
            <div key={group.id} className={classes.buttons_group}>
              <Button
                disabled={isLoading}
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className={
                  group.id === selectedGroup
                    ? classes.active
                    : undefined
                }
              >
                {group.title}
              </Button>
            </div>
          ))}
        </div>
      )}
      {!groups && <div>Nie znaleziono grup</div>}
    </div>
  );
}

export default Groups;
