---
title: Подключение аппаратных кошельков по USB
weight: 2
date: 2025-04-08
---

Для поддержки USB-подключения аппаратных кошельков в Linux, необходимо прописать правила udev, специфичные для каждого устройства.

Для каждого типа устройств рекомендуется создать отдельный файл с правилами, например:

```bash
sudo touch /etc/udev/rules.d/51-trezor.rules

#или

sudo touch /etc/udev/rules.d/20-ledger.rules
```

После создания файла, отредактируйте его с помощью редактора nano:

```bash
sudo nano /etc/udev/rules.d/51-trezor.rules
```

Последовательно нажмите *Ctrl+X*, *Y* и *Enter* для сохранения изменений и выхода из редактора.

Если вы используете аппаратный кошелек с браузерными расширениями, лучший выбор для этой задачи в Linux – браузер [Brave](https://brave.com/ru/download/).

### Зависимости

```bash
sudo usermod -a -G dialout $USER

sudo usermod -a -G plugdev $USER

sudo usermod -a -G uucp $USER

sudo apt install build-essential libudev-dev libusb-1.0-0-dev python3-pip

echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc

source ~/.bashrc

# Trezor
python3 -m pip install trezor

# Ledger
python3 -m pip install hidapi btchip-python ecdsa ledger-bitcoin

# KeepKey
python3 -m pip install keepkey

# BitBox
python3 -m pip install hidapi bitbox02

# Archos Safe-T
python3 -m pip install safet

#ColdCard
python3 -m pip install ckcc-protocol

# Jade
python3 -m pip install pyserial cbor2
```

### Правила udev

{{% expand title="Trezor" %}}
```
# Trezor: The Original Hardware Wallet  
# https://trezor.io/  
#  
# Put this file into /etc/udev/rules.d  
#  
# If you are creating a distribution package,  
# put this into /usr/lib/udev/rules.d or /lib/udev/rules.d  
# depending on your distribution  
  
# Trezor  
SUBSYSTEM=="usb", ATTR{idVendor}=="534c", ATTR{idProduct}=="0001", MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="trezor%n"  
KERNEL=="hidraw*", ATTRS{idVendor}=="534c", ATTRS{idProduct}=="0001", MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl"  
  
# Trezor v2  
SUBSYSTEM=="usb", ATTR{idVendor}=="1209", ATTR{idProduct}=="53c0", MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="trezor%n"  
SUBSYSTEM=="usb", ATTR{idVendor}=="1209", ATTR{idProduct}=="53c1", MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="trezor%n"  
KERNEL=="hidraw*", ATTRS{idVendor}=="1209", ATTRS{idProduct}=="53c1", MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl"
```
{{% /expand %}}

{{% expand title="Ledger" %}}
```
# HW.1, Nano
SUBSYSTEMS=="usb", ATTRS{idVendor}=="2581", ATTRS{idProduct}=="1b7c|2b7c|3b7c|4b7c", TAG+="uaccess", TAG+="udev-acl"

# Blue, NanoS, Aramis, HW.2, Nano X, NanoSP, Stax, Ledger Test,
SUBSYSTEMS=="usb", ATTRS{idVendor}=="2c97", TAG+="uaccess", TAG+="udev-acl"

# Same, but with hidraw-based library (instead of libusb)
KERNEL=="hidraw*", ATTRS{idVendor}=="2c97", MODE="0666"
```
{{% /expand %}}

{{% expand title="KeepKey" %}}
```
# KeepKey: Your Private Bitcoin Vault
# http://www.keepkey.com/
# Put this file into /usr/lib/udev/rules.d or /etc/udev/rules.d

# KeepKey HID Firmware/Bootloader
SUBSYSTEM=="usb", ATTR{idVendor}=="2b24", ATTR{idProduct}=="0001", MODE="0666", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="keepkey%n"
KERNEL=="hidraw*", ATTRS{idVendor}=="2b24", ATTRS{idProduct}=="0001",  MODE="0666", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl"

# KeepKey WebUSB Firmware/Bootloader
SUBSYSTEM=="usb", ATTR{idVendor}=="2b24", ATTR{idProduct}=="0002", MODE="0666", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="keepkey%n"
KERNEL=="hidraw*", ATTRS{idVendor}=="2b24", ATTRS{idProduct}=="0002",  MODE="0666", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl"
```
{{% /expand %}}

{{% expand title="BitBox" %}}
```
# BitBox V1 udev rules
SUBSYSTEM=="usb", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="dbb%n", ATTRS{idVendor}=="03eb", ATTRS{idProduct}=="2402"
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="03eb", ATTRS{idProduct}=="2402", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="dbbf%n"

# BitBox02 udev rules
SUBSYSTEM=="usb", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="bitbox02_%n", ATTRS{idVendor}=="03eb", ATTRS{idProduct}=="2403"
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="03eb", ATTRS{idProduct}=="2403", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="bitbox02-%n"
```
{{% /expand %}}

{{% expand title="Archos Safe-T" %}}
```
# Put this file into /usr/lib/udev/rules.d or /etc/udev/rules.d

# Archos Safe-T mini
SUBSYSTEM=="usb", ATTR{idVendor}=="0e79", ATTR{idProduct}=="6000", MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="safe-tr%n"
KERNEL=="hidraw*", ATTRS{idVendor}=="0e79", ATTRS{idProduct}=="6000",  MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl"

# Archos Safe-T mini Bootloader
SUBSYSTEM=="usb", ATTR{idVendor}=="0e79", ATTR{idProduct}=="6001", MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="safe-t%n"
KERNEL=="hidraw*", ATTRS{idVendor}=="0e79", ATTRS{idProduct}=="6001",  MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl"
```
{{% /expand %}}

{{% expand title="ColdCard" %}}
```
# Linux udev support file.
#
# This is a example udev file for HIDAPI devices which changes the permissions
# to 0666 (world readable/writable) for a specific device on Linux systems.
#
# - Copy this file into /etc/udev/rules.d and unplug and re-plug your Coldcard.
# - Udev does not have to be restarted.
#

# probably not needed:
SUBSYSTEMS=="usb", ATTRS{idVendor}=="d13e", ATTRS{idProduct}=="cc10", GROUP="plugdev", MODE="0666"

# required:
# from <https://github.com/signal11/hidapi/blob/master/udev/99-hid.rules>
KERNEL=="hidraw*", ATTRS{idVendor}=="d13e", ATTRS{idProduct}=="cc10", GROUP="plugdev", MODE="0666"
```
{{% /expand %}}

{{% expand title="Jade" %}}
```
KERNEL=="ttyUSB*", SUBSYSTEMS=="usb", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="ea60", MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="jade%n"
KERNEL=="ttyACM*", SUBSYSTEMS=="usb", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="55d4", MODE="0660", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl", SYMLINK+="jade%n"
```
{{% /expand %}}

{{% expand title="Keystone" %}}
```
SUBSYSTEM=="usb", ATTR{idVendor}=="1209", ATTR{idProduct}=="3001", MODE="0660", GROUP="plugdev"
```
{{% /expand %}}

{{% expand title="Правила udev для поддержки U2F на множестве устройств" %}}
```
# Copyright (c) 2020 Yubico AB. All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are
# met:
# 
#    1. Redistributions of source code must retain the above copyright
#       notice, this list of conditions and the following disclaimer.
#    2. Redistributions in binary form must reproduce the above copyright
#       notice, this list of conditions and the following disclaimer in
#       the documentation and/or other materials provided with the
#       distribution.
# 
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
# "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
# LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
# A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
# HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
# LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
# DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
# THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
# OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
# SPDX-License-Identifier: BSD-2-Clause

# This file is automatically generated, and should be used with udev 188
# or newer.

ACTION!="add|change", GOTO="fido_end"

# ellipticSecure MIRKey by STMicroelectronics
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="a2ac", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Unknown product by STMicroelectronics
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="a2ca", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Unknown product by STMicroelectronics
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="cdab", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Infineon FIDO by Infineon Technologies
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="058b", ATTRS{idProduct}=="022d", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Kensington VeriMark by Synaptics Inc.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="06cb", ATTRS{idProduct}=="0088", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# FS ePass FIDO by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="0850", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Unknown product by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="0852", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Unknown product by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="0853", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Unknown product by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="0854", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Unknown product by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="0856", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Unknown product by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="0858", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# FS MultiPass FIDO U2F by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="085a", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Unknown product by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="085b", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Unknown product by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="085d", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# BioPass FIDO2 K33 by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="0866", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# BioPass FIDO2 K43 by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="0867", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Hypersecu HyperFIDO by Feitian Technologies Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="096e", ATTRS{idProduct}=="0880", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# YubiKey NEO FIDO by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0113", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# YubiKey NEO OTP+FIDO by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0114", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# YubiKey NEO FIDO+CCID by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0115", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# YubiKey NEO OTP+FIDO+CCID by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0116", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Security Key by Yubico by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0120", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Unknown product by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0121", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Gnubby U2F by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0200", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# YubiKey 4 FIDO by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0402", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# YubiKey 4 OTP+FIDO by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0403", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# YubiKey 4 FIDO+CCID by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0406", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# YubiKey 4 OTP+FIDO+CCID by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0407", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# YubiKey Plus by Yubico AB
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1050", ATTRS{idProduct}=="0410", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# U2F Zero by Silicon Laboratories, Inc.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="10c4", ATTRS{idProduct}=="8acf", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# SoloKeys SoloHacker by pid.codes
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1209", ATTRS{idProduct}=="5070", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# SoloKeys SoloBoot by pid.codes
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1209", ATTRS{idProduct}=="50b0", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# SatoshiLabs TREZOR by pid.codes
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1209", ATTRS{idProduct}=="53c1", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# SoloKeys v2 by pid.codes
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1209", ATTRS{idProduct}=="beee", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Google Titan U2F by Google Inc.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="18d1", ATTRS{idProduct}=="5026", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# VASCO SecureClick by VASCO Data Security NV
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1a44", ATTRS{idProduct}=="00bb", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# OnlyKey (FIDO2/U2F) by OpenMoko, Inc.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1d50", ATTRS{idProduct}=="60fc", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Neowave Keydo AES by NEOWAVE
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1e0d", ATTRS{idProduct}=="f1ae", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Neowave Keydo by NEOWAVE
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1e0d", ATTRS{idProduct}=="f1d0", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Thethis Key by Shenzhen Excelsecu Data Technology Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1ea8", ATTRS{idProduct}=="f025", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# ExcelSecu FIDO2 Security Key by Shenzhen Excelsecu Data Technology Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1ea8", ATTRS{idProduct}=="fc25", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# GoTrust Idem Key by NXP Semiconductors
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="1fc9", ATTRS{idProduct}=="f143", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Nitrokey FIDO U2F by Clay Logic
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="20a0", ATTRS{idProduct}=="4287", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Nitrokey FIDO2 by Clay Logic
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="20a0", ATTRS{idProduct}=="42b1", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Nitrokey 3C NFC by Clay Logic
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="20a0", ATTRS{idProduct}=="42b2", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Safetech SafeKey by Clay Logic
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="20a0", ATTRS{idProduct}=="42b3", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# CanoKey by Clay Logic
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="20a0", ATTRS{idProduct}=="42d4", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# JaCarta U2F by Aladdin Software Security R.D.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="24dc", ATTRS{idProduct}=="0101", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# JaCarta U2F by Aladdin Software Security R.D.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="24dc", ATTRS{idProduct}=="0501", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Happlink Security Key by Plug‐up
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2581", ATTRS{idProduct}=="f1d0", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Bluink Key by Bluink Ltd
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2abe", ATTRS{idProduct}=="1002", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Blue by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="0000", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano S Old firmware by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="0001", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano X Old firmware by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="0004", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Blue by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="0011", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Blue Legacy by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="0015", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano S HID+U2F by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="1005", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano S HID+WEBUSB by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="1011", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano S HID+U2F+WEBUSB by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="1015", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano X HID+U2F by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="4005", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano X HID+WEBUSB by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="4011", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano X HID+U2F+WEBUSB by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="4015", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano S+ HID+U2F by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="5005", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano S+ HID+WEBUSB by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="5011", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Nano S+ HID+U2F+WEBUSB by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="5015", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Stax HID+U2F by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="6005", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger Stax HID+WEBUSB by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="6011", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Ledger stax HID+U2F+WEBUSB by LEDGER
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2c97", ATTRS{idProduct}=="6015", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Hypersecu HyperFIDO by Hypersecu Information Systems, Inc.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="2ccf", ATTRS{idProduct}=="0880", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# TrustKey Solutions FIDO2 G310 by eWBM Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="311f", ATTRS{idProduct}=="4a1a", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# TrustKey Solutions FIDO2 G310H/G320H by eWBM Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="311f", ATTRS{idProduct}=="4a2a", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# TrustKey Solutions FIDO2 G320 by eWBM Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="311f", ATTRS{idProduct}=="4c2a", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# eWBM FIDO2 Goldengate G500 by eWBM Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="311f", ATTRS{idProduct}=="5c2f", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# TrustKey Solutions FIDO2 T120 by eWBM Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="311f", ATTRS{idProduct}=="a6e9", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# TrustKey Solutions FIDO2 T110 by eWBM Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="311f", ATTRS{idProduct}=="a7f9", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# eWBM FIDO2 Goldengate G450 by eWBM Co., Ltd.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="311f", ATTRS{idProduct}=="f47c", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Idem Key by GoTrustID Inc.
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="32a3", ATTRS{idProduct}=="3201", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# Longmai mFIDO by Unknown vendor
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="4c4d", ATTRS{idProduct}=="f703", TAG+="uaccess", GROUP="plugdev", MODE="0660"

# SatoshiLabs TREZOR by SatoshiLabs
KERNEL=="hidraw*", SUBSYSTEM=="hidraw", ATTRS{idVendor}=="534c", ATTRS{idProduct}=="0001", TAG+="uaccess", GROUP="plugdev", MODE="0660"

LABEL="fido_end"
```
{{% /expand %}}

### Активация правил udev

После добавления файла с правилами udev для вашего устройства, выполните в терминале:

```bash
sudo udevadm control --reload-rules

sudo udevadm trigger
```