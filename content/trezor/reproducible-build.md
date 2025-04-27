---
title: Воспроизводимая сборка прошивок Trezor
weight: 10
date: 2025-04-26
---

## Подготовка

- [Виртуальная машина](linux/virtualbox) VirtualBox с установленным дистрибутивом Ubuntu 22.04 Desktop
- 50 GB для диска виртуальной машины
- 4 GB оперативной памяти
- 4 потока процессора

## Зависимости

```bash
sudo apt install python3-pip
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
python3 -m pip install trezor

for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
sudo apt install git ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -a -G docker $USER
```

Выполнив последнюю команду, необходимо выйти из системы и выполнить логин, или перезагрузить виртуальную машину.

Клонируем репозиторий прошивки:

```bash
git clone https://github.com/trezor/trezor-firmware ~/trezor-firmware
cd ~/trezor-firmware
```

## Версии прошивок

Теперь необходимо определиться, какую прошивку вы хотите протестировать на воспроизводимость.

Модели устройств имеют следующие условные обозначения:

- **T1B1** – Trezor One
- **T2T1** – Trezor T
- **T2B1** – Trezor Safe 3 rev.A
- **T3B1** – Trezor Safe 3 rev.B
- **T3T1** – Trezor Safe 5

> Условные обозначения моделей состоят из четырех символов:
> 
> - T – Trezor
> - Цифровое обозначение основного чипа: 1 – STM32F20x, 2 – STM32F42x, 3 – STM32U5
> - Тип управления: B – кнопки (Buttons), T – сенсорный экран (Touch)
> - Поколение устройства

Обозначения прошивок:

- **legacy** – прошивки Trezor One
- **core** – прошивки Trezor T, Safe 3 и Safe 5

История версий прошивок доступна по ссылкам:

- [Trezor One](https://github.com/trezor/trezor-firmware/blob/main/legacy/firmware/CHANGELOG.md)
- [Trezor T](https://github.com/trezor/trezor-firmware/blob/main/core/CHANGELOG.T2T1.md)
- [Trezor Safe 3 rev.A](https://github.com/trezor/trezor-firmware/blob/main/core/CHANGELOG.T2B1.md)
- [Trezor Safe 3 rev.B](https://github.com/trezor/trezor-firmware/blob/main/core/CHANGELOG.T3B1.md)
- [Trezor Safe 5](https://github.com/trezor/trezor-firmware/blob/main/core/CHANGELOG.T3T1.md)

## Сборка прошивки

> Команда запуска сборки может отличаться от версии к версии, поэтому необходимо проверить доступные опции с помощью команды:
> 
> ```bash
> ./build-docker.sh --help
>```

### Legacy

Соберем мультивалютную прошивку 1.13.0 для Trezor One. Команды будут выглядеть следующим образом:

```bash
git checkout legacy/v1.13.0
./build-docker.sh --skip-core --skip-bitcoinonly legacy/v1.13.0
```

После сборки файл прошивки **firmware.bin** будет находиться в поддиректории `build/legacy-T1B1/firmware/`.

### Core

Соберем мультивалютную прошивку 2.8.9 для Trezor T. Команды будут выглядеть следующим образом:

```bash
git checkout core/v2.8.9
# модели устройств можно указать через запятую, например --models T2B1, T3T1
./build-docker.sh --skip-bitcoinonly --models T2T1 core/v2.8.9
```

После сборки файл прошивки **firmware.bin** будет находиться в поддиректории `build/core-T2T1/firmware/`.

## Проверка прошивки

### Legacy

Скачайте, распространяемую разработчиками, версию прошивки:

```bash
trezorctl firmware download --model T1B1 --version 1.13.0
```

```
Downloading from https://data.trezor.io/firmware/t1b1/trezor-t1b1-1.13.0.bin  
Trezor One v2 firmware (1.8.0 or later)  
Firmware version 1.13.0 build 0  
Firmware fingerprint: 356433bd9de6cb564bf7778fc5de73c56197459523358f267e9235af9e1ce46d  
Firmware saved under trezor-t1b1-1.13.0.bin.
```

[Заголовок](https://github.com/trezor/trezor-firmware/blob/main/docs/legacy/firmware-format.md) официальной прошивки включает цифровые подписи Satoshi Labs – 195 байт на смещении 0x220 или 544 в десятичной системе счисления. Перепишем подписи в заголовке нулями:

```bash
dd if=/dev/zero of=trezor-t1b1-1.13.0.bin bs=1 seek=544 count=195 conv=notrunc
```

```
195+0 records in
195+0 records out
195 bytes copied, 0,00155346 s, 126 kB/s
```

Сравним хэш-суммы подготовленной официальной прошивки и прошивки, собранной из исходного кода:

```bash
sha256sum trezor-t1b1-1.13.0.bin
```

```
cf72859c0995e04e09ea36eefaca28906e99dffa7b72fb1327410de4006cbd6c  trezor-t1b1-1.13.0.bin
```

```bash
sha256sum build/legacy-T1B1/firmware/firmware.bin
```

```
cf72859c0995e04e09ea36eefaca28906e99dffa7b72fb1327410de4006cbd6c  build/legacy-T1B1/firmware/firmware.bin
```

### Core

Скачайте, распространяемую разработчиками, версию прошивки:

```bash
trezorctl firmware download --model T2T1 --version 2.8.9
```

```
Downloading from https://data.trezor.io/firmware/t2t1/trezor-t2t1-2.8.9.bin  
T2T1 firmware image.  
Vendor header from SatoshiLabs, version 0.0  
Firmware version 2.8.9 build 0  
Firmware fingerprint: ec61dba50be195f1cbb78688a0b92fb293c23150b68f5dab3b44420a106fca17  
Firmware saved under trezor-t2t1-2.8.9.bin.
```

[Заголовок](https://github.com/trezor/trezor-firmware/blob/main/docs/core/misc/boot.md) официальной прошивки включает цифровую подпись Satoshi Labs длиной 65 байт.

В зависимости от модели устройства подписи находятся на следующих смещениях в прошивке:

- **T2T1** – 5567
- **T2B1** – 1471
- **T3B1** – 1471
- **T3T1** – 1983

Используя нужное смещение, перепишем подписи в заголовке нулями:

```bash
dd if=/dev/zero of=trezor-t2t1-2.8.9.bin bs=1 seek=5567 count=65 conv=notrunc
```

```
65+0 records in  
65+0 records out  
65 bytes copied, 0,000794589 s, 81,8 kB/s
```

Сравним хэш-суммы подготовленной официальной прошивки и прошивки, собранной из исходного кода:

```bash
sha256sum trezor-t2t1-2.8.9.bin
```

```
16c98a0ce67a84723f053da98a02cfa79717af85bd73df52acafc6c37aeebe94  trezor-t2t1-2.8.9.bin
```

```bash
sha256sum build/core-T2T1/firmware/firmware.bin
```

```
16c98a0ce67a84723f053da98a02cfa79717af85bd73df52acafc6c37aeebe94  build/core-T2T1/firmware/firmware.bin
```