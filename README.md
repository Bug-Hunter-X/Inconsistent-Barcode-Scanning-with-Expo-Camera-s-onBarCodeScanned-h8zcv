# Inconsistent Barcode Scanning with Expo Camera's onBarCodeScanned

This repository demonstrates a bug in Expo's Camera component where the `onBarCodeScanned` callback function is not always triggered reliably. The issue is particularly noticeable when barcodes are scanned rapidly or multiple times in quick succession.

## Bug Description
The `onBarCodeScanned` callback often misses barcode scans under high-frequency scanning scenarios. This results in lost data and an unreliable barcode reading experience. The provided `bug.js` file reproduces this issue.

## Solution
The `bugSolution.js` file offers a potential solution to mitigate the problem. The solution involves debouncing the callback function to prevent rapid-fire triggering.  This significantly improves reliability but may introduce a small delay in barcode recognition.

## How to Reproduce
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `expo start` to launch the Expo development server.
4. Scan barcodes rapidly. Notice that some scans may be missed by the original `bug.js` example.
5. Compare with the corrected behavior of the `bugSolution.js` example.

## Additional Notes
This bug may be related to the underlying barcode scanning library used by Expo Camera. Future updates to Expo or the library might resolve this issue.  The provided debouncing solution is a workaround, not a definitive fix.