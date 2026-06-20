// app/api/calendar/route.ts
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET() {
  const res = await fetch("https://www.forexfactory.com/calendar", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; PropFirmBot/1.0)",
    },
  });

  const html = await res.text();
  const $ = cheerio.load(html);



  const events: any[] = [];

  $(".calendar__row").each((_, row) => {
    const time = $(row).find(".calendar__time").text().trim();
    const currency = $(row).find(".calendar__currency").text().trim();
    const event = $(row).find(".calendar__event").text().trim();
    const impact = $(row).find(".calendar__impact span").attr("title");
    const previous = $(row).find(".calendar__previous").text().trim();
    const forecast = $(row).find(".calendar__forecast").text().trim();

    if (event) {
      events.push({
        time,
        currency,
        event,
        impact, // High / Medium / Low
        previous,
        forecast,
      });
    }
  });

  return NextResponse.json(events);
}
