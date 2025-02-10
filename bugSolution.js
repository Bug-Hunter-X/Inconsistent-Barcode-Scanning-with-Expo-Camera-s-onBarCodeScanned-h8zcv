The issue is likely due to the rapid firing of the `onBarCodeScanned` callback.  Debouncing the function can solve the problem:

```javascript
import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // Debounce function to prevent rapid-fire triggering
    let timeoutId;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScanned(true);
        setBarcodeData(data);
      }, 500); // Adjust delay as needed
    };
  };

  if (hasPermission === null) {
    return <View />;  
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} onBarCodeScanned={handleBarCodeScanned}>
        {scanned && (
          <View>
            <Text>Barcode data: {barcodeData}</Text>
            <Button title="Scan again" onPress={() => setScanned(false)} />
          </View>
        )}
      </Camera>
    </View>
  );
};

export default CameraScreen;
```