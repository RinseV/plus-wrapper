import axios from 'axios';
import { Plus } from '../src';

jest.mock('axios');

axios.create = jest.fn().mockReturnThis();
const requestMock = axios.request as jest.Mock;

describe('Plus client', () => {
    it('should create a client object', () => {
        const client = new Plus();
        expect(client).toBeDefined();
    });

    it('should create a client with provided options', () => {
        const client = new Plus({
            apiVersion: 1
        });
        expect(client).toBeDefined();
    });

    it('should make a GET request', async () => {
        const client = new Plus();
        requestMock.mockReturnValueOnce({
            statusText: 'OK',
            data: {
                message: 'Hello World'
            }
        });
        const response = await client.get('/');
        expect(response).toStrictEqual({ message: 'Hello World' });
    });

    it('should error from the GET request', async () => {
        const client = new Plus();
        requestMock.mockReturnValueOnce({
            statusText: 'Internal Server Error'
        });
        try {
            await client.get('/');
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    it('should log the request in the console', async () => {
        const logSpy = jest.spyOn(console, 'log');
        logSpy.mockImplementation(() => {});
        const client = new Plus({
            verbose: true
        });
        requestMock.mockReturnValueOnce({
            statusText: 'OK'
        });
        await client.get('/');
        expect(logSpy).toHaveBeenCalledTimes(3);
    });

    it('should create default headers', () => {
        const client = new Plus();
        const headers = client.createHeader();
        expect(headers).toStrictEqual({
            'Content-Type': 'application/json',
            'User-Agent': 'plus-wrapper'
        });
    });

    it('should create properly formatted URL from query', () => {
        const client = new Plus();
        const url = client.createURL('', {
            test: 'test'
        });
        expect(url).toBe('https://pls-sprmrkt-mw.prd.vdc1.plus.nl/api/v3/?test=test');
    });
});
