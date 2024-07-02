export const AddAuthor = ({ onAdd }) => (
  <fieldset
    style={{
      border: "none",
      borderRadius: "20px",
      backgroundColor: "#333",
      padding: "25px",
      color: "white",
    }}
  >
    <form
      onSubmit={onAdd}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "550px",
        }}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "550px",
        }}
      >
        <label htmlFor="surname">Surname</label>
        <input id="surname" name="surname" />
      </div>
      <button
        style={{
          backgroundColor: "white",
          color: "#333",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          border: "none",
          width: "fit-content",
        }}
      >
        Add
      </button>
    </form>
  </fieldset>
);
