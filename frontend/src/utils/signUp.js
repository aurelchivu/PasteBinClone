import axios from 'axios'

export const signUp = (username, email, password) => async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:5000/api/v1/auth/register',
      { username, email, password },
      config
    );

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
