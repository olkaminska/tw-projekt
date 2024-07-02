export const AuthorsList = ({ authors = [], onDelete, onEdit }) => (
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th></th> {}
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr key={author.id}>
            <td>{author.name}</td>
            <td>{author.surname}</td>
            <td className="action-cell">
              <button
                className="action-btn edit-btn"
                onClick={() => onEdit(author)}
              >
                Edit
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => onDelete(author.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
