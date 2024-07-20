// BookModel.js
import './BookModel.css';
function BookModel({ title, author, coverImageUrl }) {
    return (
      <div className="book">
        <img src={coverImageUrl} alt={`Cover of ${title}`} className="book-cover" />
        <div className="book-details">
          <h2 className="book-title">{title}</h2>
          <p className="book-author">{author}</p>
        </div>
      </div>
    );
  }

  export default BookModel;