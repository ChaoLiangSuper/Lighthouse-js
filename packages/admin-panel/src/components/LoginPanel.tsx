import React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import * as authApi from '../api/authentication';
import FloatingLoading from './FloatingLoading';
import UserContext from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  formWrapper: {
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  error: {
    background: theme.palette.error.light,
    color: theme.palette.error.contrastText
  }
}));

interface FormShape {
  username: string;
  password: string;
}

const initialValues: FormShape = {
  username: '',
  password: ''
};

const LoginPanel: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const userContext = React.useContext(UserContext.Context);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async ({ username, password }: FormShape, { setSubmitting }: FormikHelpers<FormShape>) => {
    try {
      setError(null);
      const user = await authApi.login(username, password);
      userContext.login(user);
      history.push('/');
    } catch ({ response }) {
      if (response) {
        setError(response.data.msg);
      } else {
        setError('Network Error');
      }
      setSubmitting(false);
    }
  };

  return (
    <Paper className={classes.paper} elevation={10}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <div className={classes.formWrapper}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ submitForm, isSubmitting }) => (
            <Form>
              {error ? (
                <Typography align="center" className={classes.error}>
                  {error}
                </Typography>
              ) : null}
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className={classes.submit}
                onClick={submitForm}
              >
                Sign In
              </Button>
              {isSubmitting && <FloatingLoading text="Authenticating..." />}
            </Form>
          )}
        </Formik>
      </div>
    </Paper>
  );
};

export default LoginPanel;
