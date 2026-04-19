import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, payload } = await req.json()
    console.log(`[financial-processor] Processing action: ${action}`)

    let result = {}

    switch (action) {
      case 'sync-bank':
        // Simulate calling a banking API like Plaid
        console.log("[financial-processor] Simulating bank synchronization...")
        result = {
          status: 'success',
          accounts: [
            { name: 'ATB Checking', balance: 4250.00, type: 'Checking' },
            { name: 'ATB Mastercard', balance: -1240.50, type: 'Credit Card' },
            { name: 'Wealthsimple Savings', balance: 15000.00, type: 'Savings' }
          ]
        }
        break

      case 'analyze-paystub':
        // Simulate OCR and data extraction from a paystub PDF
        console.log("[financial-processor] Simulating paystub analysis for file:", payload?.fileName)
        result = {
          status: 'success',
          data: {
            grossPay: 3450.00,
            netPay: 2580.00,
            deductions: 870.00,
            payDate: new Date().toISOString().split('T')[0]
          }
        }
        break

      case 'scan-receipt':
        // Simulate OCR for a receipt image
        console.log("[financial-processor] Simulating receipt scanning...")
        result = {
          status: 'success',
          data: {
            merchant: 'Costco Wholesale',
            amount: 142.85,
            category: 'Groceries',
            date: new Date().toISOString().split('T')[0]
          }
        }
        break

      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error("[financial-processor] Error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})