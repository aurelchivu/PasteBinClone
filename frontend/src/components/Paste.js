import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Paste = ({ match }) => {
  const [pastesList, setPastesList] = useState([]);

  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const listPastes = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/pastes`,
        config
      );

      console.log(data);

      setPastesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPastes();
  }, []);

  const paste = pastesList.find((p) => p._id === match.params.pasteId);
  console.log(paste);

  return (
    <>
      {paste && (
        <div>
          <h2>{paste.title}</h2>
          <p>{paste.content}</p>
        </div>
      )}
    </>
  );
};

export default Paste;
