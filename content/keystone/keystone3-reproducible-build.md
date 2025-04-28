---
title: Воспроизводимая сборка прошивок Keystone 3 Pro
weight: 2
date: 2025-04-28
---

## Подготовка

- [Виртуальная машина](linux/virtualbox) VirtualBox с установленным дистрибутивом Ubuntu 22.04 Desktop
- 40 GB для диска виртуальной машины
- 4 GB оперативной памяти
- 4 потока процессора
- Установленный [Docker](linux/docker)

## Зависимости

Устанавливаем Rust:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
. "$HOME/.cargo/env" #не забудьте точку в начале
rustup install nightly-2024-07-01
```

Клонируем репозиторий прошивки:

```bash
git clone https://github.com/KeystoneHQ/keystone3-firmware ~/keystone3-firmware
cd ~/keystone3-firmware
git -c submodule.keystone3-firmware-release.update=none submodule update --init --recursive
```

Собираем образ Docker:

```bash
docker build -t keystonehq/keystone3_baker:1.0.2 .
```

Собираем утилиты для упаковки и проверки прошивки:

```bash
cd ~/keystone3-firmware/tools/code/firmware-maker/
cargo build
cd ~/keystone3-firmware/tools/code/firmware-checker/
cargo build
```

## Сборка прошивки

```bash
cd ~/keystone3-firmware/
git checkout tags/2.0.8 # Укажите актуальную версию прошивки

# Мультивалютная прошивка
docker run -v $(pwd):/keystone3-firmware keystonehq/keystone3_baker:1.0.2 python3 build.py -e production

# Прошивка BTC-Only
docker run -v $(pwd):/keystone3-firmware keystonehq/keystone3_baker:1.0.2 python3 build.py -e production -t btc_only

# Прошивка Cypherpunk
docker run -v $(pwd):/keystone3-firmware keystonehq/keystone3_baker:1.0.2 python3 build.py -e production -t cypherpunk

sudo chown $USER:$USER build/mh1903.bin
```

## Проверка прошивки

Хэш-сумма полученного файла `build/mh1903.bin` должна совпадать со значением **Source Code SHA-256 Checksum**, указанным на [официальном сайте](https://keyst.one/firmware), [странице релиза](https://github.com/KeystoneHQ/keystone3-firmware/releases/tag/2.0.8)  на GitHub и в меню аппаратного кошелька **Настройки устройства** > **Об устройстве** > **Об устройстве** > **Версия прошивки** > **Показать контрольную сумму**.

```bash
sha256sum build/mh1903.bin
```

```
eea023f8556314431e8b89a883cf78061b8bf8f2ee9c79e25d96555bacb9cfe5  build/mh1903.bin
```

{{% image src="img/keystone/keystone3-reproducible-build.webp" /%}}

Упаковываем прошивку в установочный файл (без цифровой подписи разработчиков):

```bash
./tools/code/firmware-maker/target/debug/fmm --source build/mh1903.bin --destination keystone3-unsigned.bin
```

Проверим хэш-сумму прошивки в полученном установочном файле:

```bash
./tools/code/firmware-checker/target/debug/fmc --source keystone3-unsigned.bin
```

```
Firmware checksum sha256: eea023f8556314431e8b89a883cf78061b8bf8f2ee9c79e25d96555bacb9cfe5    
You can check this value on your device.
```

Проверим хэш-сумму в оригинальном установочном файле:

```bash
# Используйте ссылку на файл с официального сайта (SD card Update)
wget https://keyst.one/contents/KeystoneFirmwareG3/v2.0.8/web3/keystone3.bin
./tools/code/firmware-checker/target/debug/fmc --source keystone3.bin
```

```
Firmware checksum sha256: eea023f8556314431e8b89a883cf78061b8bf8f2ee9c79e25d96555bacb9cfe5    
You can check this value on your device.
```