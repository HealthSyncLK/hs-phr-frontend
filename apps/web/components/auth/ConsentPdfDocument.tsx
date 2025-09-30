
'use client';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 6,
    lineHeight: 1.4,
  },
  listItem: {
    fontSize: 11,
    marginBottom: 4,
    marginLeft: 15,
    lineHeight: 1.3,
  },
  signatureSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    borderTopStyle: 'solid',
  },
  signatureImage: {
    width: 200,
    height: 80,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderStyle: 'solid',
  },
  timestamp: {
    fontSize: 10,
    color: '#666666',
  },
});

// PDF Document Component
export const ConsentPDFDocument = ({ formConfig, signatureValue }: { formConfig: any, signatureValue: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{formConfig.consent.pdfTitle}t</Text>
      
      <View style={styles.section}>
        <Text style={styles.title}>{formConfig.consent.title}</Text>
        <Text style={styles.text}>{formConfig.consent.descTitle}</Text>
        
        {formConfig.consent?.description?.length > 0 ? (
          formConfig.consent.description.map((item: string, index: number) => (
            <Text key={index} style={styles.listItem}>
              • {item}
            </Text>
          ))
        ) : (
          <Text style={styles.listItem}>Consent details not available</Text>
        )}
      </View>

      {signatureValue && (
        <View style={styles.signatureSection}>
          <Text style={styles.title}>{formConfig.signature.title}</Text>
          <Image
            style={styles.signatureImage}
            src={signatureValue}
          />
          <Text style={styles.timestamp}>
            Digitally signed on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </Text>
        </View>
      )}
    </Page>
  </Document>
);