
import axios from 'axios';
import { NextResponse } from 'next/server';

const FACEBOOK_INSIGHTS_URL =
  'https://graph.facebook.com/v21.0/act_479737574954773/insights';

export async function GET() {
  try {
    const response = await axios.get(FACEBOOK_INSIGHTS_URL, {
      params: {
        time_increment: 1,
        time_range: { since: '2024-01-01', until: '2024-12-31' },
        level: 'adset',
        fields: 'campaign_name,adset_name,spend',
        access_token: "EAAbRTCZB3ZCjQBO8a4eiZCyyjP0XYpZCFTAb5ZCtbyH9QaO4u0xZCMEXPNTH38kWmoBJFy4Wx4q7NcslVZBiBdwk3i8Aw9ZCyWfZCxwIOtUnqOqUPyXxVyM5ZA0uev5EznrHlYPhUDZCwbZBZAvRRJEbhgYRD6m8udoS289H73zZAdrXGgWdbCdncsIZB9pkP8B1F31GWfnbeIgfCVwM3jrfnkItqIEH51nCUfZBZCpbxZAgZDZD",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar insights:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar insights do Facebook' },
      { status: 500 }
    );
  }
}
