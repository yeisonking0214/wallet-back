import http from 'http';
import * as soap from 'soap';
import fs from 'fs';
import path from 'path';
import { userService } from './services/userService';
import { connectToMongo } from './db/mongoClient';
import sgMail from '@sendgrid/mail';

const wsdlPath = path.join(__dirname, 'wsdl', 'userService.wsdl');
console.log('path ::', wsdlPath);
const xml = fs.readFileSync(wsdlPath, 'utf8');

const server = http.createServer((req, res) => {
  res.statusCode = 404;
  res.end('Not Found');
});


soap.listen(server, '/wsdl', userService as any, xml);


console.log('process.env.SENDGRID_API_KEY', process.env.SENDGRID_API_KEY);

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
connectToMongo().catch((err) => {
  console.error('Error al conectar a MongoDB:', err);
});


server.listen(process.env.PORT || 8000, () => {
  console.log('SOAP server listening on http://localhost:8000/wsdl');
});
