import * as ScanditSDK from 'scandit-sdk';

export default function startScandit() {
  ScanditSDK.configure("ASqLtxVbDs0nJ4cPHEFgSkQEBHR0AbRap3RE095znkQKCX8oN1x2dI0kyD8GXuSO0V1T+ph3mQ3jZ1g3bjntx9VWEDTzQQolOGGvxEFwE0UdSWI/Nm4RRLg655AkJIn+LUZydq6vNn9rMw2n607mc1PoY6cH7z7wwRcruDdHXGTQcUbi+sqba4lSRs8+K6s7dMymMqDZ3qxf9Y3ZF61m5vEUx+0+hF8d0PjPuGJLaDq4sOR/rhCjiY/F6US0s7ok8kt+sEO0gZ0wLmF9MPSxfgTKQ2MiCWujjH8Rfe1OWLHUlYeUFni2s7SqdFbbWVLc//QVLQq7kRl6fku58d5mYroA+Zq3pbWeWrShDtoYtiv79zfKODYTEYI6I4qFClR7ZaxEEFvlrDFzZDCmf9JjrfRBpNqdR7bVGqqRDmnKp65YfgZc2A83/E5oskLVwu8GroY2PcUVPU3N4R7GmdPBHjdxXl02/mXinrh0Hzmg6DS2EyibiaqCVlLVPm5XM4HzBXgYtmVuZzinkQqMtAKJRtqM1BB3F1HeuxApJvIv2eAOQqkR176mDjWryggXcdmuRMYAbSy11e6GUHbrDliNc4dcCkcVSbZYmmHJh5DaBw8wnx2ynhZtzukh/Qvd2nfA0dvjO4wfeiJm6sYbEvjJv7K/8JHsTwCp4XjBdA7dLaAcUnDuXnHYU25gkHqZNgFrdNO7TY5bC05fOcYSXVohrRU8O3gsh7TL1zlMztrHVlECWpkoEfml8gtjcFml1ch7ThL0zByB/LZ4dfazqvWblDrRj/Evm2DRr1da1e8hkMS3bw==",{
    engineLocation: "https://unpkg.com/scandit-sdk/build"
  })

  ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
    playSoundOnScan: true,
    vibrateOnScan: true
  }).then(barcodePicker => {
    var scanSettings =  new ScanditSDK.ScanSettings({
      enabledSymbologies: ["ean13"],
      codeDuplicateFilter: 1000
    });
    barcodePicker.applyScanSettings(scanSettings);
    barcodePicker.onScan(function(scanResult) {
      alert(scanResult.barcodes.reduce(function(string, barcode) {
        return string + ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "\n";
      }, ""));
    });
  });
}