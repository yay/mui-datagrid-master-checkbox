import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {
  DataGridPremium,
  GridColDef,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid-premium";
import {
  randomCreatedDate,
  randomPrice,
  randomCurrency,
  randomCountry,
  randomCity,
  randomEmail,
  randomInt,
  randomAddress,
  randomCommodity,
} from "@mui/x-data-grid-generator";
import { CountryIsoOption } from "@mui/x-data-grid-generator/services/static-data";

type DetailPanelContentProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
};

const DetailPanelContent: React.FC<DetailPanelContentProps> = (props) => {
  const rowProp = props.row;
  return (
    <Stack
      sx={{ py: 2, height: 1, boxSizing: "border-box" }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <Typography variant="h6">{`Order #${rowProp.id}`}</Typography>
          <Grid container>
            <Grid item md={6}>
              <Typography variant="body2" color="textSecondary">
                Customer information
              </Typography>
              <Typography variant="body1">{rowProp.customer}</Typography>
              <Typography variant="body1">{rowProp.email}</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="body2" align="right" color="textSecondary">
                Shipping address
              </Typography>
              <Typography variant="body1" align="right">
                {rowProp.address}
              </Typography>
              <Typography
                variant="body1"
                align="right"
              >{`${rowProp.city}, ${rowProp.country.label}`}</Typography>
            </Grid>
          </Grid>
          <DataGridPremium
            density="compact"
            checkboxSelection
            columns={[
              { field: "name", headerName: "Product", flex: 1 },
              {
                field: "quantity",
                headerName: "Quantity",
                align: "center",
                type: "number",
              },
              { field: "unitPrice", headerName: "Unit Price", type: "number" },
              {
                field: "total",
                headerName: "Total",
                type: "number",
                valueGetter: ({ row }) => row.quantity * row.unitPrice,
              },
            ]}
            rows={rowProp.products}
            sx={{ flex: 1 }}
            hideFooter
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID" },
  { field: "customer", headerName: "Customer", width: 200 },
  { field: "date", type: "date", headerName: "Placed at" },
  { field: "currency", headerName: "Currency" },
  {
    field: "total",
    type: "number",
    headerName: "Total",
    valueGetter: ({ row }) => {
      const subtotal = row.products.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (_acc: number, product: any) => product.unitPrice * product.quantity,
        0
      );
      const taxes = subtotal * 0.05;
      return subtotal + taxes;
    },
  },
];

function generateProducts() {
  const quantity = randomInt(1, 5);
  return [...Array(quantity)].map((_, index) => ({
    id: index,
    name: randomCommodity(),
    quantity: randomInt(1, 5),
    unitPrice: randomPrice(1, 1000),
  }));
}

type DetailGridRowModel = {
  id: number;
  customer: string;
  email: string;
  date: Date;
  address: string;
  country: CountryIsoOption;
  city: string;
  currency: string;
  products: {
    id: number;
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
};

const rows: GridRowsProp<DetailGridRowModel> = [
  {
    id: 1,
    customer: "Matheus",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 2,
    customer: "Olivier",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 3,
    customer: "Flavien",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 4,
    customer: "Danail",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
  {
    id: 5,
    customer: "Alexandre",
    email: randomEmail(),
    date: randomCreatedDate(),
    address: randomAddress(),
    country: randomCountry(),
    city: randomCity(),
    currency: randomCurrency(),
    products: generateProducts(),
  },
];

const BasicDetailPanels: React.FC = () => {
  const getDetailPanelContent = React.useCallback(
    ({ row }: GridRowParams<DetailGridRowModel>) => (
      <DetailPanelContent row={row} />
    ),
    []
  );

  const getDetailPanelHeight = React.useCallback(() => 400, []);

  return (
    <Box sx={{ width: 1, height: 400 }}>
      <DataGridPremium
        columns={columns}
        rows={rows}
        rowThreshold={0}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
        checkboxSelection
      />
    </Box>
  );
};

export default BasicDetailPanels;
