import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Add your SSLCommerz store ID and password
  const store_id = "your_store_id";
  const store_passwd = "your_store_password";
  const is_live = false; // Set to true for production

  const data = {
    store_id: store_id,
    store_passwd: store_passwd,
    total_amount: body.total_amount,
    currency: body.currency,
    tran_id: body.tran_id,
    success_url: body.success_url,
    fail_url: body.fail_url,
    cancel_url: body.cancel_url,
    shipping_method: body.shipping_method,
    product_name: body.product_name,
    product_category: body.product_category,
    product_profile: body.product_profile,
    cus_name: body.cus_name,
    cus_email: body.cus_email,
    cus_add1: body.cus_add1,
    cus_phone: body.cus_phone,
    ship_name: body.ship_name,
    ship_add1: body.ship_add1,
    ship_city: body.ship_city,
    ship_postcode: body.ship_postcode,
    ship_country: body.ship_country,
  };

  try {
    const response = await fetch(
      is_live
        ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
        : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data as any).toString(),
      }
    );

    const result = await response.json();

    if (result.status === "SUCCESS") {
      return NextResponse.json({ GatewayPageURL: result.GatewayPageURL });
    } else {
      return NextResponse.json(
        { error: "Payment initiation failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
