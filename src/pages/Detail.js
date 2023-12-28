import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API_BASE_URL, SITE } from '../config/host-config';
import styles from '../styles/SearchFolder.module.scss';
import CardPublic from '../components/CardPublic';
import { colors } from '@mui/material';

const Detail = () => {
  const { folderId } = useParams();
  const requestUri = API_BASE_URL + SITE;
  const token = localStorage.getItem('ACCESS_TOKEN');
  const [list, setList] = useState([]);

  // console.log();

  const fetchMySiteList = async () => {
    const res = await fetch(requestUri + '?folderId=' + `${folderId}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    console.log(res);

    const list = await res.json();
    console.log('lists: ', list);
    // list.map(())
    setList(list);
  };
  useEffect(() => {
    fetchMySiteList();
  }, []);
  return (
    <div
      className={styles.list}
      // onChange={fetchMySiteList}
    >
      <ul>
        {list.length &&
          list.map((data) => (
            <li
              key={data.id}
              className={styles.span}
            >
              <span>사이트 이름: {data.siteName}</span>
              <span>
                사이트 URL: <a href={data.url}>{data.url}</a>
              </span>
              <span>Description: {data.comment}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Detail;
