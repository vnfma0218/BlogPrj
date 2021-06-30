import React, { useState } from 'react';
import Modal from '../UIElement/Modal';

import { Link, useHistory } from 'react-router-dom';
import './ArticleItem.css';
import axios from 'axios';

const ArticleItem = ({ title, content, createdAt, id, onRemove }) => {
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const onDeleteClick = (e) => {
    setModal(true);
  };
  const onCancel = (e) => {
    setModal(false);
  };

  const onDelete = async () => {
    setModal(false);
    try {
      let result = await axios.delete(
        `http://localhost:5000/api/articles/${id}`
      );
      onRemove(result.data.deletedId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='article_container'>
      <Modal onModal={modal} onCancel={onCancel} onDelete={onDelete} />
      <h1>
        <Link to='/detail'>{title}</Link>
      </h1>
      <p>{createdAt}</p>
      <div className='content'>
        {content.length > 300 ? `${content.substring(0, 100)}...` : content}
      </div>
      <div className='article_btns'>
        <Link to={`/edit/${id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={onDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default ArticleItem;
