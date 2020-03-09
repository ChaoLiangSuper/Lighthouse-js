import express from 'express';
import * as user from '../controllers/user';
import * as organization from '../controllers/organization';
import * as directory from '../controllers/directory';
import * as record from '../controllers/record';

const router = express.Router();

router.get('/users', user.getUsers);
router.post('/user/new', user.createUser);

router.get('/organizations', organization.getOrganizations);
router.post('/organization/new', organization.createOrganization);

router.get('/directories', directory.getDirectories);
router.post('/directory/new', directory.createDirectory);

router.get('/records', record.getRecords);
router.post('/record/new', record.createRecord);

export default router;
