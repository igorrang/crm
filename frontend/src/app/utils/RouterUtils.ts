import { NextResponse } from 'next/server';

const UnauthorizedResponse = NextResponse.json({
  status: 401,
  message: 'Unauthorized request',
});

const RouteUtils = { UnauthorizedResponse };
export default RouteUtils;
