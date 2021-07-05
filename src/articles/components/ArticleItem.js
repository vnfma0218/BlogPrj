import React, { useEffect, useState } from 'react';
import Modal from '../../UIElement/Modal';

import { Link } from 'react-router-dom';
import './ArticleItem.css';
import useHttp from '../../hooks/use-http';

const ArticleItem = ({ title, content, createdAt, id, onRemove }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { sendRequest } = useHttp();

  useEffect(() => {
    return () => setShowConfirmModal(false);
  }, []);

  const onDeleteClick = (e) => {
    setShowConfirmModal(true);
  };
  const onCancel = (e) => {
    setShowConfirmModal(false);
  };

  const onDelete = async () => {
    setShowConfirmModal(false);
    try {
      // let result = await axios.delete(
      //   `http://localhost:5000/api/articles/${id}`
      // );
      const getResponse = ({ data }) => {
        onRemove(data.deletedId);
      };
      sendRequest(
        {
          url: `http://localhost:5000/api/articles/${id}`,
          method: 'delete',
        },
        getResponse
      );

      // onRemove(result.data.deletedId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='article_container'>
      <Modal
        show={showConfirmModal}
        message={'Are you sure? Delete this?'}
        btns={
          <>
            <button className='subBtn' onClick={onDelete}>
              Delete
            </button>
            <button className='subBtn' onClick={onCancel}>
              Calcel
            </button>
          </>
        }
      ></Modal>
      <h1>{title}</h1>
      <p>{createdAt}</p>
      <div className='content'>
        {/* {content.length > 300 ? `${content.substring(0, 100)}...` : content} */}
        <Link to={`/detail/${id}`}>
          <h3>See Detail</h3>
        </Link>
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
