import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  TextInput, Animated, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radii, Typography } from '../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';

type Mode = 'camera' | 'manual';

export default function QRScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<Mode>('camera');
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [manualInput, setManualInput] = useState('');

  // Line animation for the scanning beam
  const scanLineAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Auto-request camera permission when component mounts
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  useEffect(() => {
    if (mode === 'camera' && permission?.granted && !scanned) {
      startScanLineAnimation();
    }
  }, [mode, permission?.granted, scanned]);

  const startScanLineAnimation = () => {
    scanLineAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);
    setScannedData(data);
  };

  const handleManualSubmit = () => {
    if (manualInput.length < 6) return;
    // In production: pass data back via router params or global state
    router.back();
  };

  const handleUseScanned = () => {
    // Pass scanned data back (in production use router params)
    router.back();
  };

  // ── Camera Mode ───────────────────────────────────────────
  if (mode === 'camera') {
    // No permission yet — show request screen
    if (!permission) {
      return (
        <SafeAreaView style={styles.safe}>
          <Header onClose={() => router.back()} onToggle={() => setMode('manual')} toggleLabel="Enter Manually" />
          <View style={styles.centeredState}>
            <MaterialCommunityIcons name="camera-outline" size={64} color={Colors.textMuted} />
            <Text style={styles.stateTitle}>Requesting camera…</Text>
          </View>
        </SafeAreaView>
      );
    }

    // Permission denied — show grant screen
    if (!permission.granted) {
      return (
        <SafeAreaView style={styles.safe}>
          <Header onClose={() => router.back()} onToggle={() => setMode('manual')} toggleLabel="Enter Manually" />
          <View style={styles.centeredState}>
            <View style={styles.permissionIllustration}>
              <MaterialCommunityIcons name="camera-off" size={56} color={Colors.error} />
            </View>
            <Text style={styles.stateTitle}>Camera access denied</Text>
            <Text style={styles.stateSubtitle}>
              To scan QR codes, allow Ping to access your camera. You can also enter the recipient number manually.
            </Text>
            <TouchableOpacity
              id="qr-grant-btn"
              style={styles.primaryBtn}
              onPress={requestPermission}
            >
              <MaterialCommunityIcons name="camera" size={18} color="#fff" />
              <Text style={styles.primaryBtnText}>Enable Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              id="qr-manual-btn"
              style={styles.secondaryBtn}
              onPress={() => setMode('manual')}
            >
              <Text style={styles.secondaryBtnText}>Enter number manually</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    // Scanned successfully — show result card
    if (scanned) {
      return (
        <SafeAreaView style={styles.safe}>
          <Header onClose={() => router.back()} onToggle={() => { setScanned(false); setScannedData(''); }} toggleLabel="Scan Again" />
          <View style={styles.centeredState}>
            <View style={styles.successCircle}>
              <MaterialCommunityIcons name="qrcode-scan" size={48} color={Colors.success} />
            </View>
            <Text style={styles.stateTitle}>QR Code Detected</Text>
            <Text style={styles.stateSubtitle}>Recipient identified from QR code.</Text>

            <View style={styles.scannedResult}>
              <View style={styles.scannedResultIcon}>
                <MaterialCommunityIcons name="cellphone-wireless" size={20} color={Colors.brand} />
              </View>
              <View>
                <Text style={styles.scannedResultLabel}>M-Pesa · Zambia</Text>
                <Text style={styles.scannedResultValue}>{scannedData || '+260 97 123 4567'}</Text>
              </View>
            </View>

            <TouchableOpacity
              id="qr-use-btn"
              style={styles.primaryBtn}
              onPress={handleUseScanned}
            >
              <MaterialCommunityIcons name="check" size={18} color="#fff" />
              <Text style={styles.primaryBtnText}>Use this recipient</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => { setScanned(false); setScannedData(''); }}
            >
              <Text style={styles.secondaryBtnText}>Scan a different code</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    // Active camera view
    const scanLineTranslate = scanLineAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 120],
    });

    return (
      <View style={styles.cameraScreen}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr', 'aztec', 'pdf417'] }}
        />

        {/* Dark overlay with cutout illusion */}
        <View style={styles.overlay}>
          {/* Top dark band */}
          <View style={styles.overlayBand} />

          {/* Middle row: side bands + scan frame */}
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />

            {/* Scan frame */}
            <View style={styles.scanFrame}>
              {/* Corner brackets */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />

              {/* Animated scan beam */}
              <View style={styles.scanBeamContainer}>
                <Animated.View
                  style={[
                    styles.scanBeam,
                    { transform: [{ translateY: scanLineTranslate }] },
                  ]}
                />
              </View>
            </View>

            <View style={styles.overlaySide} />
          </View>

          {/* Bottom dark band with hints */}
          <View style={[styles.overlayBand, styles.overlayBottom]}>
            <Text style={styles.scanHint}>
              Point at an M-Pesa or merchant QR code
            </Text>
            <TouchableOpacity
              id="qr-switch-manual-btn"
              style={styles.manualToggle}
              onPress={() => setMode('manual')}
            >
              <MaterialCommunityIcons name="keyboard-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.manualToggleText}>Enter number manually</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Close button overlay */}
        <SafeAreaView style={styles.cameraTopBar}>
          <TouchableOpacity id="qr-close-btn" style={styles.cameraCloseBtn} onPress={() => router.back()}>
            <MaterialCommunityIcons name="close" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.cameraTitle}>Scan to Pay</Text>
          <View style={{ width: 44 }} />
        </SafeAreaView>
      </View>
    );
  }

  // ── Manual Entry Mode ────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      <Header
        onClose={() => router.back()}
        onToggle={() => { setMode('camera'); setScanned(false); }}
        toggleLabel="Use Camera"
      />

      <View style={styles.manualContainer}>
        <View style={styles.manualIllustration}>
          <MaterialCommunityIcons name="qrcode-scan" size={56} color={Colors.brand} />
        </View>
        <Text style={styles.manualTitle}>Enter recipient details</Text>
        <Text style={styles.manualSubtitle}>
          Enter the M-Pesa phone number or wallet ID of the recipient.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.fieldLabel}>M-PESA NUMBER OR WALLET ID</Text>
          <View style={styles.inputRow}>
            <View style={styles.railBadge}>
              <MaterialCommunityIcons name="cellphone-wireless" size={16} color={Colors.brand} />
              <Text style={styles.railBadgeText}>M-Pesa</Text>
            </View>
            <View style={styles.inputDivider} />
            <TextInput
              id="qr-manual-input"
              style={styles.textInput}
              placeholder="+260 97 123 4567"
              placeholderTextColor={Colors.textMuted}
              value={manualInput}
              onChangeText={setManualInput}
              keyboardType="phone-pad"
              autoFocus
            />
          </View>
        </View>

        <View style={styles.formatsCard}>
          <Text style={styles.formatsTitle}>ACCEPTED FORMATS</Text>
          {[
            { label: 'Zambia M-Pesa', example: '+260 97 XXX XXXX' },
            { label: 'Kenya M-Pesa', example: '+254 7XX XXX XXX' },
            { label: 'Merchant QR ID', example: 'MPESA-XXXXX' },
          ].map(item => (
            <View key={item.label} style={styles.formatRow}>
              <Text style={styles.formatLabel}>{item.label}</Text>
              <Text style={styles.formatValue}>{item.example}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          id="qr-confirm-btn"
          style={[styles.primaryBtn, manualInput.length < 6 && styles.primaryBtnDisabled]}
          onPress={handleManualSubmit}
          disabled={manualInput.length < 6}
        >
          <Text style={styles.primaryBtnText}>Confirm Recipient</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Shared Header ────────────────────────────────────────
function Header({
  onClose, onToggle, toggleLabel,
}: {
  onClose: () => void;
  onToggle: () => void;
  toggleLabel: string;
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity id="qr-back-btn" onPress={onClose} style={styles.headerBack}>
        <MaterialCommunityIcons name="close" size={22} color={Colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Scan to Pay</Text>
      <TouchableOpacity id="qr-toggle-btn" onPress={onToggle} style={styles.toggleBtn}>
        <Text style={styles.toggleBtnText}>{toggleLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const FRAME_SIZE = 260;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgWhite },

  // Camera full-screen
  cameraScreen: { flex: 1, backgroundColor: '#000' },
  cameraTopBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  cameraCloseBtn: {
    width: 44, height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },

  // Overlay
  overlay: { ...StyleSheet.absoluteFillObject, flexDirection: 'column' },
  overlayBand: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)' },
  overlayBottom: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
    gap: Spacing.lg,
  },
  overlayMiddle: { flexDirection: 'row', height: FRAME_SIZE },
  overlaySide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)' },

  // Scan frame
  scanFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    position: 'relative',
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#fff',
    borderRadius: 3,
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 },

  // Scan beam
  scanBeamContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', overflow: 'hidden' },
  scanBeam: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.brandLight,
    opacity: 0.85,
    shadowColor: Colors.brandLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },

  scanHint: { color: 'rgba(255,255,255,0.85)', fontSize: 14, textAlign: 'center', fontWeight: '500' },
  manualToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  manualToggleText: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600' },

  // Header (light screens)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.bgWhite,
  },
  headerBack: { padding: 4 },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  toggleBtn: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.full,
  },
  toggleBtnText: { fontSize: 13, fontWeight: '600', color: Colors.brandLight },

  // Centered states (permission request, success)
  centeredState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  permissionIllustration: {
    width: 100, height: 100,
    borderRadius: 50,
    backgroundColor: Colors.errorBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  successCircle: {
    width: 100, height: 100,
    borderRadius: 50,
    backgroundColor: Colors.successBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  stateTitle: { ...Typography.h2, color: Colors.textPrimary, textAlign: 'center' },
  stateSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  scannedResult: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.bgBase,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    width: '100%',
    marginVertical: Spacing.sm,
  },
  scannedResultIcon: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannedResultLabel: { fontSize: 12, color: Colors.textMuted, fontWeight: '500' },
  scannedResultValue: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginTop: 2 },

  // Buttons
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.brand,
    borderRadius: Radii.md,
    paddingVertical: 16,
    width: '100%',
  },
  primaryBtnDisabled: { backgroundColor: Colors.bgSubtle },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  secondaryBtnText: { fontSize: 15, fontWeight: '600', color: Colors.brandLight },

  // Manual entry
  manualContainer: {
    flex: 1,
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  manualIllustration: {
    alignSelf: 'center',
    width: 100, height: 100,
    backgroundColor: '#EBF4FF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manualTitle: { ...Typography.h2, color: Colors.textPrimary, textAlign: 'center' },
  manualSubtitle: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center' },
  inputGroup: { gap: Spacing.xs },
  fieldLabel: { ...Typography.label, color: Colors.textMuted, textTransform: 'uppercase' },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    overflow: 'hidden',
    alignItems: 'center',
  },
  railBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    backgroundColor: '#EBF4FF',
  },
  railBadgeText: { fontSize: 13, fontWeight: '700', color: Colors.brand },
  inputDivider: { width: 1, height: 24, backgroundColor: Colors.border },
  textInput: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  formatsCard: {
    backgroundColor: Colors.bgSubtle,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  formatsTitle: { ...Typography.label, color: Colors.textMuted, textTransform: 'uppercase', marginBottom: 4 },
  formatRow: { flexDirection: 'row', justifyContent: 'space-between' },
  formatLabel: { fontSize: 13, color: Colors.textSecondary },
  formatValue: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, fontFamily: 'monospace' },
});
