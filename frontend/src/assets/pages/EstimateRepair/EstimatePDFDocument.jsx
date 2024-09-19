import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    margin: "10px 0",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    border: "1px solid black",
    padding: 5,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
});

const EstimatePDFDocument = ({ repairEstimate, estimateList }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Vehicle Information Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Vehicle Information</Text>
        <Text>Vehicle No: {repairEstimate.Register_Number}</Text>
        <Text>Engine: {repairEstimate.Engine_Details}</Text>
        <Text>Model: {repairEstimate.Model}</Text>
        <Text>Year: {repairEstimate.Year}</Text>
        <Text>Make: {repairEstimate.Make}</Text>
        <Text>Vehicle Color: {repairEstimate.Vehicle_Color}</Text>
        <Text>Transmission: {repairEstimate.Transmission_Details}</Text>
      </View>

      {/* Customer Information Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Customer Information</Text>
        <Text>CUS Id: {repairEstimate.cusID}</Text>
        <Text>First Name: {repairEstimate.firstName}</Text>
        <Text>Last Name: {repairEstimate.lastName}</Text>
        <Text>Email: {repairEstimate.email}</Text>
        <Text>Contact: {repairEstimate.phone}</Text>
        <Text>NIC: {repairEstimate.NIC}</Text>
      </View>

      {/* Insurance Information Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Insurance Information</Text>
        <Text>Insurance Provider: {repairEstimate.insuranceProvider}</Text>
        <Text>Agent Name: {repairEstimate.agentName}</Text>
        <Text>Agent Email: {repairEstimate.agentEmail}</Text>
        <Text>Agent Contact: {repairEstimate.agentContact}</Text>
        <Text>Description: {repairEstimate.shortDescription}</Text>
      </View>

      {/* Estimate Table Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Estimate Details</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Name</Text>
            <Text style={styles.tableCol}>Unit Price</Text>
            <Text style={styles.tableCol}>Quantity</Text>
            <Text style={styles.tableCol}>Total</Text>
          </View>
          {/* Table Body */}
          {estimateList.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{item.name}</Text>
              <Text style={styles.tableCol}>{item.unitPrice}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>
                {item.quantity * item.unitPrice}
              </Text>
            </View>
          ))}
          {/* Subtotal Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Subtotal:</Text>
            <Text style={styles.tableCol}>{repairEstimate.totalAmount}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default EstimatePDFDocument;
