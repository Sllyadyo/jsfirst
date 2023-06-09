import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'antd';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
    getPosts().then((data) => setPosts(data));
  }, []);

  // Функция для получения данных о пользователях с сервера
  const getUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

   // Функция для получения данных о постах с сервера
   const getPosts = async () => {
     try{
       const response=await axios.get('https://jsonplaceholder.typicode.com/posts')
       return response.data;
     }
     catch(error){
       console.error(error);
     }
   }

   // Добавление стилизации 
   const styles = {
    color: 'black',
    border: '1px solid #00B96B',
    padding: 15,
    margin: '10px 50px 20px',
    marginBottom: 5,
    backgroundColor: '#00B96B',
    fontFamily: 'GDS Infinity'
  }

  const styles2 = {
    color: 'black',
    border: '1px solid #C355C5',
    padding: 15,
    margin: '10px 50px 20px',
    marginBottom: 5,
    backgroundColor: '#C355C5',
    fontFamily: 'Carta Magna Line',
  }

  const styles3 = {
    color: 'black',
    border: '1px solid #5347D4',
    padding: 7,
    margin: '10px 50px 20px',
    marginBottom: 5,
    backgroundColor: '#5347D4',
    fontFamily: 'Morning Beach'
  }

   // Поиск постов пользователей и сохранение информации в новом массиве объектов
const usersWithPost = users.map(user=>({...user,
post: posts.find(post=>post.userId === user.id)}))

return (
<div style={{ padding: "20px" }}>
<h1 style={styles}>Список пользователей:</h1>

<Row gutter={[16,16]}>
{users.map(user =>
        <Col span={8} key={user.id}>
          <Card style={styles} title={user.name}>
            <p>Email: {user.email}</p>
            <p>Телефон: {user.phone}</p>
          </Card>
        </Col>)}
</Row>

<h1 style={styles2}>Посты:</h1>

<Row gutter={[16,16]}>
{posts.map(post =>
        <Col span={8} key={post.id}>
          <Card style={styles2} title={post.title}>
            <p>{post.body}</p>
          </Card>
        </Col>)}
</Row>

<h1 style={styles3}>Посты пользователей:</h1>

<Row gutter={[16,16]}>
{usersWithPost.map(user =>
  user.post &&
    <Col span={8} key={`${user.id}-${user.post.id}`}>
      <Card style={styles3} title={`${user.name} написал:`}>
        <>
          <h3>{user.post.title}</h3>
          <p>{user.post.body}</p>  
        </>
      </Card>
    </Col>)
}
</Row>

</div>
);
}

export default App;


