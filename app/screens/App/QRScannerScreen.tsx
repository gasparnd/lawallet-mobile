import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Button} from '@/ui';

export default function QRScreen() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      console.log(
        '🚀 ~ file: QRScannerScreen.tsx:13 ~ getBarCodeScannerPermissions ~ status:',
        status,
      );
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`,
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button text={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
