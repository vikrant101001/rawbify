// Demo data utilities for Rawbify demo experience

export const DEMO_PROMPT = `Transform sales data into customer intelligence:
1. Group by sales_id and calculate Customer_ID, Total_Revenue (sum), Deal_Count (count), Avg_Deal_Size (mean of total_revenue)
2. Add Customer_Type (first customer_type), Primary_Region (first region), Preferred_Sales_Rep (first sales_rep_name)
3. Create Customer_Tier: High for top 20% revenue, Medium for middle 60%, Low for bottom 20%
4. Reorder columns for dashboard readiness: Customer_Tier, Customer_ID, Total_Revenue, Customer_Type, Deal_Count, Avg_Deal_Size, Primary_Region, Preferred_Sales_Rep`

export const DEMO_USER_ID = 'user_admin'

export const DEMO_FILE_NAME = 'sales_data_demo.csv'

export const SAMPLE_DATA_HEADERS = [
  'id', 'sales_id', 'date', 'sales_rep_name', 'region', 
  'product_category', 'product_name', 'quantity_sold', 
  'unit_price', 'total_revenue', 'customer_type', 
  'deal_stage', 'close_date', 'sales_cycle_days', 'commission_rate'
]

export const SAMPLE_DATA_PREVIEW = [
  {
    sales_id: 'S00512',
    sales_rep_name: 'Alice Johnson',
    region: 'West',
    total_revenue: 174917.55,
    customer_type: 'SMB',
    product_category: 'Software'
  },
  {
    sales_id: 'S00316', 
    sales_rep_name: 'Ian Thompson',
    region: 'North',
    total_revenue: 24753.96,
    customer_type: 'SMB',
    product_category: 'Software'
  },
  {
    sales_id: 'S00891',
    sales_rep_name: 'Bob Smith', 
    region: 'East',
    total_revenue: 89234.12,
    customer_type: 'Enterprise',
    product_category: 'Hardware'
  }
]

export const TRANSFORMATION_STATS = {
  input: {
    rows: 793,
    columns: 15,
    description: 'Raw sales transactions'
  },
  output: {
    rows: 739,
    columns: 8,
    description: 'Customer intelligence insights'
  },
  processing_time: '< 10 seconds'
}

export const EXPECTED_OUTPUT_COLUMNS = [
  'Customer_Tier',
  'Customer_ID', 
  'Total_Revenue',
  'Customer_Type',
  'Deal_Count',
  'Avg_Deal_Size',
  'Primary_Region',
  'Preferred_Sales_Rep'
]

export const SAMPLE_OUTPUT_PREVIEW = [
  {
    Customer_Tier: 'High',
    Customer_ID: 'S00512',
    Total_Revenue: 487250,
    Customer_Type: 'Enterprise', 
    Deal_Count: 12,
    Avg_Deal_Size: 40604,
    Primary_Region: 'West',
    Preferred_Sales_Rep: 'Alice Johnson'
  },
  {
    Customer_Tier: 'High',
    Customer_ID: 'S00316', 
    Total_Revenue: 423180,
    Customer_Type: 'SMB',
    Deal_Count: 8,
    Avg_Deal_Size: 52898,
    Primary_Region: 'North', 
    Preferred_Sales_Rep: 'Ian Thompson'
  },
  {
    Customer_Tier: 'Medium',
    Customer_ID: 'S00891',
    Total_Revenue: 298450,
    Customer_Type: 'SMB',
    Deal_Count: 15,
    Avg_Deal_Size: 19897,
    Primary_Region: 'East',
    Preferred_Sales_Rep: 'Bob Smith'
  }
]

// Load sample CSV data from public folder
export const loadSampleCSV = async (): Promise<string> => {
  try {
    const response = await fetch('/sample-data/sales_data_demo.csv')
    if (!response.ok) {
      throw new Error('Failed to load sample data')
    }
    return await response.text()
  } catch (error) {
    console.error('Error loading sample CSV:', error)
    // Return a fallback CSV structure
    return generateFallbackCSV()
  }
}

// Generate fallback CSV data if file not found
const generateFallbackCSV = (): string => {
  const headers = SAMPLE_DATA_HEADERS.join(',')
  const rows = [
    '1,S00512,01/04/2025,Alice Johnson,West,Software,Security Shield,43.0,4067.85,174917.55,SMB,Qualified,,73.0,5.68',
    '2,S00316,05/03/2025,Ian Thompson,North,Software,ERP Suite,47.0,526.68,24753.96,SMB,Proposal,,53.0,13.18',
    '3,S00891,12/01/2025,Bob Smith,East,Hardware,Cloud Storage,25.0,3569.36,89234.12,Enterprise,Closed,15/01/2025,45.0,8.42'
  ]
  
  return [headers, ...rows].join('\n')
}

// Create demo data object for localStorage
export const createDemoData = (csvContent: string) => {
  const lines = csvContent.split('\n').filter(line => line.trim())
  const headers = lines[0].split(',')
  const data = lines.slice(1).map((line, index) => {
    const values = line.split(',')
    const row: any = { id: index + 1 }
    headers.forEach((header, i) => {
      row[header.trim()] = values[i]?.trim() || ''
    })
    return row
  })

  return {
    filename: DEMO_FILE_NAME,
    data: data,
    headers: headers,
    userId: DEMO_USER_ID
  }
}

// Simulate API processing delay
export const simulateProcessingDelay = (min: number = 2000, max: number = 4000): Promise<void> => {
  const delay = Math.random() * (max - min) + min
  return new Promise(resolve => setTimeout(resolve, delay))
}
