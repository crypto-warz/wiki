---
title: Проверка подлинности Trezor One
weight: 5
date: 2025-04-08
---

В Trezor Suite встроен механизм проверки подлинности прошивки, однако эта информация скрыта от пользователя и могут наблюдаться ложные срабатывания. В данной статье мы разберемся, как проверить прошивку самостоятельно.

## Подготовка

Для всех тестов, представленных здесь, понадобится утилита командной строки **trezorctl**. Наиболее простым вариантом будет использование Linux или виртуальной машины с Linux. Для установки Ubuntu в VirtualBox и настройки USB-подключения Trezor обратитесь к следующим руководствам:

- [Установка Ubuntu в VirtualBox](linux/virtualbox)
- [Подключение аппаратных кошельков по USB](linux/udev-rules)

> Официальная документация Trezor по установке **trezorctl**:
> - [Для MacOS](https://trezor.io/learn/a/trezorctl-on-macos)
> - [Для Windows](https://trezor.io/learn/a/trezorctl-on-windows)

Установите необходимые программы с помощью команд:

```bash
sudo apt install python3-pip wget
python3 -m pip install trezor
```

## Проверка подлинности загрузчика нового устройства

Все устройства Trezor поставляются с предустановленным загрузчиком, но без установленной прошивки. При первом подключении на экране должно отображаться приглашение **Go to trezor.io/start**:

{{% image src="img/trezor/trezor-one-check-1.webp" /%}}

### Проверка версии предустановленного загрузчика

```bash
trezorctl get-features
```

```
Features (29 bytes) {  
   bootloader_mode: True,         # устройство в режиме загрузчика
   firmware_present: False,       # прошивка отсутствует
   language_version_matches: True,  
   major_version: 1,              # версия загрузчика
   minor_version: 11,             # версия загрузчика
   model: '1',                    # Trezor One
   patch_version: 0,              # версия загрузчика
   vendor: 'trezor.io',  
}
```

Таким образом, в данном примере версия загрузчика: **1.11**.0.

### Установка старой версии прошивки

> Если у вас установлена последняя версия загрузчика (на данный момент 1.12.1), то установить старую версию прошивки не получится. История версий загрузчика доступна по [ссылке](https://github.com/trezor/trezor-firmware/blob/main/legacy/bootloader/CHANGELOG.md).

Вместо установки последней версии прошивки, как предлагает по умолчанию Trezor Suite, можно установить любую прошивку, соответствующую значениям major_version и minor_version загрузчика. Прейдите в [каталог](https://github.com/trezor/data/tree/master/firmware/t1b1) с официальными релизами прошивок Trezor One и скачайте любую прошивку, которая соответствует загрузчику. В нашем примере это может быть любая из четырех прошивок:
- trezor-t1b1-**1.11**.1.bin
- trezor-t1b1-**1.11**.2.bin
- trezor-t1b1-**1.11**.1-bitcoinonly.bin
- trezor-t1b1-**1.11**.2-bitcoinonly.bin

Получите ссылку на прошивку, кликнув на нужной версии прошивки и скопировав на следующей странице ссылку на **Raw**-файл:

{{% image src="img/trezor/trezor-one-check-2.webp" /%}}

Скачайте прошивку и получите данные о файле прошивки:

```bash
wget https://github.com/trezor/data/raw/refs/heads/master/firmware/t1b1/trezor-t1b1-1.11.1.bin
trezorctl firmware verify trezor-t1b1-1.11.1.bin
```

```
Trezor One firmware with embedded v2 image (1.8.0 or later)  
Firmware version 1.11.1 build 0  
Firmware fingerprint: f7c60d0b8c2853afd576867c6562aba5ea52bdc2ce34d0dbb8751f52867c3665  
Embedded v2 image fingerprint: 35399198fa0a3204b5db82c84b276435fa13a99a38aac0667b6b5fd9af99cae6
```

Сравните полученное значение **Firmware fingerprint** с оригинальным по [ссылке](https://github.com/trezor/data/blob/c5c7d63af17c2bb9154674704c828048bbe303f3/firmware/t1b1/releases.json):

{{% image src="img/trezor/trezor-one-check-3.webp" /%}}

Установите прошивку на устройство:

```bash
trezorctl firmware update -f trezor-t1b1-1.11.1.bin
# Подтвердите установку прошивки на устройстве
```

```
Trezor One firmware with embedded v2 image (1.8.0 or later)  
Firmware version 1.11.1 build 0  
Firmware fingerprint: f7c60d0b8c2853afd576867c6562aba5ea52bdc2ce34d0dbb8751f52867c3665  
Embedded v2 image fingerprint: 35399198fa0a3204b5db82c84b276435fa13a99a38aac0667b6b5fd9af99cae6  
Firmware is appropriate for your device.  
Extracting embedded_v2 firmware image.  
Uploading  [####################################]  100%
```

Удалите файл прошивки:

```bash
rm trezor-t1b1-1.11.1.bin
```

### Проверка подлинности предустановленного загрузчика и ревизии прошивки

Посмотрим данные кошелька с установленной прошивкой:

```bash
trezorctl get-features
```

```
Features (177 bytes) {  
   auto_lock_delay_ms: 600000,  
   backup_availability: NotAvailable (0),  
   bootloader_hash: 32 bytes 0xfa12a44fa05fd1d20539358b54f301cee4c3219c9f1bb3a5772ffd609af9e8e2,  
   capabilities: [<Capability.Bitcoin: 1>, <Capability.Bitcoin_like: 2>, <Capability.Crypto: 5>, <Capability.Ethereum: 7>, <Capability.NEM: 10>, <Capability.Stellar: 12>, <Capability.U2F: 14>],  
   device_id: '28866F0CE98FA4B1393D4029',  
   fw_vendor: 'SatoshiLabs',  
   initialized: False,  
   language: 'en-US',  
   language_version_matches: True,  
   major_version: 1,  
   minor_version: 11,  
   model: '1',  
   no_backup: False,  
   passphrase_protection: False,  
   patch_version: 1,  
   pin_protection: False,  
   revision: 20 bytes 0x85a26d2c9593bcdf858c2d718d79951ca927a0c3,  
   safety_checks: Strict (0),  
   unfinished_backup: False,  
   unlocked: True,  
   vendor: 'trezor.io',  
   wipe_code_protection: False,  
}
```

Перезагрузим устройство в режим загрузчика и вновь получим данные об устройстве:

```bash
trezorctl device reboot-to-bootloader
# Подтвердите действие на устройстве
trezorctl get-features
```

```
Features (38 bytes) {  
   bootloader_mode: True,         # устройство в режиме загрузчика
   firmware_present: True,        # прошивка установлена
   fw_major: 1,                   # версия прошивки
   fw_minor: 11,                  # версия прошивки
   fw_patch: 1,                   # версия прошивки
   language_version_matches: True,  
   major_version: 1,              # версия загрузчика
   minor_version: 11,             # версия загрузчика
   model: '1',                    # Trezor One
   patch_version: 0,              # версия загрузчика
   vendor: 'trezor.io',  
}
```

- Версия загрузчика: 1.11.0 (не изменилась).
- Хэш-сумма загрузчика (bootloader_hash): 0x**fa12a44fa05fd1d20539358b54f301cee4c3219c9f1bb3a5772ffd609af9e8e2**. Сравним ее с оригинальной в коде прошивки Trezor One по [ссылке](https://github.com/trezor/trezor-firmware/blob/37c13ed75efa051da61fdb2c97811f5d02cd3095/legacy/firmware/bl_check.c).

{{% image src="img/trezor/trezor-one-check-4.webp" %}}
\x**fa**\x**12**\x**a4**\x**4f**\x**a0**\x**5f**\x**d1**\x**d2**

\x**05**\x**39**\x**35**\x**8b**\x**54**\x**f3**\x**01**\x**ce**

\x**e4**\x**c3**\x**21**\x**9c**\x**9f**\x**1b**\x**b3**\x**a5**

\x**77**\x**2f**\x**fd**\x**60**\x**9a**\x**f9**\x**e8**\x**e2**
{{% /image %}}

- Ревизия прошивки (revision): 0x**85a26d2c9593bcdf858c2d718d79951ca927a0c3**. Сравним хэш ревизии с оригинальным по [ссылке](https://github.com/trezor/data/blob/c5c7d63af17c2bb9154674704c828048bbe303f3/firmware/t1b1/releases.json).

{{% image src="img/trezor/trezor-one-check-5.webp" /%}}

Таким образом мы убедились, что изначально в устройство был предустановлен оригинальный загрузчик. Прошивка Trezor не обновляет загрузчик, если в бинарном файле прошивки не находится новая версия загрузчика.

Ревизия установленной прошивки совпадает с прошивкой, которую мы устанавливали на [этом](trezor/trezor-one-check/#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-%D1%81%D1%82%D0%B0%D1%80%D0%BE%D0%B9-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8-%D0%BF%D1%80%D0%BE%D1%88%D0%B8%D0%B2%D0%BA%D0%B8) шаге.

### Установка последней версии прошивки

- Установите последнюю версию прошивки штатным способом через Trezor Suite.
- Проверьте хэш-сумму и версию загрузчика, а также ревизию прошивки, как на [предыдущем](trezor/trezor-one-check/#%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B0-%D0%BF%D0%BE%D0%B4%D0%BB%D0%B8%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D0%B8-%D0%BF%D1%80%D0%B5%D0%B4%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D1%87%D0%B8%D0%BA%D0%B0-%D0%B8-%D1%80%D0%B5%D0%B2%D0%B8%D0%B7%D0%B8%D0%B8-%D0%BF%D1%80%D0%BE%D1%88%D0%B8%D0%B2%D0%BA%D0%B8) шаге.

Версия загрузчика должна измениться на последнюю, что так же свидетельствует о подлинности предустановленного загрузчика. Загрузчик может быть обновлен только с помощью оригинальной прошивки, поскольку оригинальная прошивка проверяет цифровую подпись SatoshiLabs в загрузчике, прежде чем запустить механизм обновления.

## Проверка подлинности прошивки

Проверьте версию установленной прошивки:

```bash
trezorctl get-features
```

```
Features (172 bytes) {  
   backup_availability: NotAvailable (0),  
   bootloader_hash: 32 bytes 0x94f1c90db28db1f8ce5dca966976343658f5dadee83834987c8b049c49d1edd0,  
   busy: False,  
   capabilities: [<Capability.Bitcoin: 1>, <Capability.Bitcoin_like: 2>, <Capability.Crypto: 5>, <Capability.Ethereum: 7>, <Capability.NEM: 10>, <Capability.Stellar: 12>, <Capability.U2F: 14>],  
   device_id: 'AD250C4AE5D3EE1E83E77746',  
   fw_vendor: 'SatoshiLabs',  
   initialized: True,  
   language: 'en-US',  
   language_version_matches: True,  
   major_version: 1,               # Версия прошивки
   minor_version: 12,              # Версия прошивки
   model: '1',  
   no_backup: False,  
   passphrase_protection: False,  
   patch_version: 1,               # Версия прошивки
   pin_protection: True,  
   revision: 20 bytes 0x1eb0eb9d91b092e571aac63db4ebff2a07fd8a1f,  
   safety_checks: Strict (0),  
   unfinished_backup: False,  
   unlocked: False,  
   vendor: 'trezor.io',  
}
```

Таким образом, версия установленной прошивки: 1.12.1.

Скачайте данную прошивку из официального [каталога](https://github.com/trezor/data/tree/c5c7d63af17c2bb9154674704c828048bbe303f3/firmware/t1b1) прошивок и сверьте  **Firmware fingerprint** с оригинальным по [ссылке](https://github.com/trezor/data/blob/c5c7d63af17c2bb9154674704c828048bbe303f3/firmware/t1b1/releases.json), подробнее см. в [этом](trezor/trezor-one-check/#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-%D1%81%D1%82%D0%B0%D1%80%D0%BE%D0%B9-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8-%D0%BF%D1%80%D0%BE%D1%88%D0%B8%D0%B2%D0%BA%D0%B8) разделе руководства.

```bash
wget https://github.com/trezor/data/raw/c5c7d63af17c2bb9154674704c828048bbe303f3/firmware/t1b1/trezor-t1b1-1.12.1.bin
trezorctl firmware verify trezor-t1b1-1.12.1.bin
```

```
Trezor One v2 firmware (1.8.0 or later)  
Firmware version 1.12.1 build 0  
Firmware fingerprint: 3c694191f5b66a65cb5bb209adbf113cb40209e644b77162ba996bb7ee8f382b
```

Создайте случайное шестнадцатеричное число:

```bash
head -c 32 /dev/urandom | xxd -p | tr -d '\n'
```

```
d8538f6498279b4a85db4a25763e138166f36ffcdd079d775bfce673c87d734f
```

Это число будет использовано для тестирования файла прошивки, а затем прошивки установленной на устройстве. Результирующие значения должны совпасть, что подтвердит соответствие установленной прошивки скачанному файлу, поскольку случайное число (challenge) только что создано и не может быть известно заранее прошивке аппаратного кошелька.

Скачайте [скрипт](https://github.com/trezor/trezor-firmware/blob/11cb171e1ae92a547ea1cdbcf8e13b1ef5bcc115/tools/firmware_hash.py) для проверки файла прошивки и запустите вычисление хэша, используя ваше случайное число.

```bash
wget https://github.com/trezor/trezor-firmware/blob/11cb171e1ae92a547ea1cdbcf8e13b1ef5bcc115/tools/firmware_hash.py
python3 firmware_hash.py d8538f6498279b4a85db4a25763e138166f36ffcdd079d775bfce673c87d734f trezor-t1b1-1.12.1.bin
```

```
trezor-t1b1-1.12.1.bin: 5b2dfee1b32b57f747560fb5ec7a7ae01a857525fa6c0d151310d908d071030a
```

Запустите проверку прошивки, используя то же случайное число:

```bash
trezorctl firmware get-hash d8538f6498279b4a85db4a25763e138166f36ffcdd079d775bfce673c87d734f
```

```
5b2dfee1b32b57f747560fb5ec7a7ae01a857525fa6c0d151310d908d071030a
```

Удалите файл прошивки:

```bash
rm trezor-t1b1-1.12.1.bin
```

## Дополнительная проверка

Вредоносная прошивка, по аналогии с подделками Trezor T, наверняка не будет правильно работать с кодовой фразой. Порядок проверки:

- Создайте новую сид-фразу (только для теста), для этого необходимо сбросить кошелек на заводские настройки.

> Перед сбросом устройства проверьте валидность резервной копии вашей сид-фразы, перейдя в настройки Trezor Suite > **Устройство** > **Проверить резервную копию**.

- Добавьте длинную кодовую фразу в Trezor Suite с помощью функции **Скрытый кошелек**.
- Получите адрес Bitcoin.
- В утилите Яна Коулмана [BIP39](https://iancoleman.io/bip39) вставьте тестовую сид-фразу в поле **BIP39 Mnemonic** > добавьте кодовую фразу в поле **BIP39 Passphrase** > ниже в разделе **Derivation Path** перейдите на вкладку **BIP84** > в разделе **Derived Addresses** первый Bitcoin-адрес должен совпасть с адресом в Trezor Suite.

> Разработчики Trezor настоятельно рекомендуют всегда использовать надежную кодовую фразу, поскольку эти аппаратные кошельки уязвимы к взлому при физическом доступе к устройству. Однако, неправильное использование данной функции может привести к потере доступа к вашим средствам. Подробнее см. в [этом](security/passphrase) материале.

## Предупреждение

Разработчик Trezor под ником **matejcik** [не исключает](https://forum.trezor.io/t/my-trezor-was-hacked/14589/26) возможности существования вредоносных прошивок, которые могут отвергнуть обновление прошивки при первом подключении и сгенерировать предопределенную сид-фразу. Впоследствии такая прошивка может быть перезаписана оригинальной. Если вы не уверены в изначальной подлинности устройства, рекомендуется:
- Перевести активы в безопасное место
- Полностью стереть устройство с помощью команд:

```bash
trezorctl device reboot-to-bootloader
trezorctl device wipe --bootloader
# Подтвердите действие на устройстве
```

- Установить последнюю версию прошивки
- Проверить подлинность прошивки согласно данного руководства