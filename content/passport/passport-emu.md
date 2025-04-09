---
title: Эмулятор Passport Core
weight: 1
date: 2025-03-28
---

{{% image src="img/passport/passport-emu.webp" /%}}

## Подготовка

- [Виртуальная машина](linux/virtualbox) VirtualBox с установленным дистрибутивом Ubuntu 22.04 Desktop
- 30 GB для диска виртуальной машины
- 4 GB оперативной памяти
- 4 потока процессора
- Камера, доступная из виртуальной машины

## Зависимости

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup default 1.67.1
cargo install cbindgen
wget -qO - 'https://proget.makedeb.org/debian-feeds/prebuilt-mpr.pub' | gpg --dearmor | sudo tee /usr/share/keyrings/prebuilt-mpr-archive-keyring.gpg 1> /dev/null
echo "deb [arch=all,$(dpkg --print-architecture) signed-by=/usr/share/keyrings/prebuilt-mpr-archive-keyring.gpg] https://proget.makedeb.org prebuilt-mpr $(lsb_release -cs)" | sudo tee /etc/apt/sources.list.d/prebuilt-mpr.list
sudo apt update
sudo apt install build-essential git gcc cmake autotools-dev automake autoconf libusb-1.0-0-dev libtool python3 python3-pip python3-venv python-is-python3 libffi-dev libsdl2-dev libsdl2-2.0-0 pkg-config curl xterm just
```

## Сборка

```bash
git clone https://github.com/Foundation-Devices/passport2.git ~/passport
cd ~/passport/simulator
pip install -r requirements.txt
just sim color
```

## Запуск эмулятора

```bash
cd ~/passport/simulator
just sim color
```