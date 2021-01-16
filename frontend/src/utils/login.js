import axios from 'axios';

export const login = (email, password) => async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:5000/api/v1/auth/login',
      { email, password },
      config
    );
    console.log(data)

    localStorage.setItem('userInfo', JSON.stringify(data));
    
  } catch (error) {
    console.log(error);
  }
};
