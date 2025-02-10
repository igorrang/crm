import { NextResponse } from 'next/server';

const UnauthorizedResponse = NextResponse.json({
  status: 401,
  message: 'Unauthorized request',
  
});
console.log(UnauthorizedResponse)
const RouteUtils = { UnauthorizedResponse };
export default RouteUtils;
