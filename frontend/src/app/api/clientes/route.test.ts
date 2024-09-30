import { GET } from './route';
import axios from 'axios';

jest.mock('axios');

describe('GET function', () => {
    it('should return data from the API', async () => {
        const mockRequest = {
            json: jest.fn().mockResolvedValue({}),
        } as unknown as Request;

        const mockData: { data: string } = { data: 'test' };

        (axios.post as jest.Mock).mockResolvedValue({ data: mockData });

        const response = await axios.post(`${process.env.BASE_URL}/table`);
        const responseData = response.data;
        expect(responseData).toEqual(mockData);
    });
});
