---
title: Эмулятор ColdCard
weight: 1
---

## Подготовка

- Виртуальная машина VirtualBox с установленным дистрибутивом Ubuntu 22.04 Desktop
- 30 GB для диска виртуальной машины
- 4 GB оперативной памяти
- 4 потока процессора

## Зависимости

```bash
sudo apt install build-essential git python3 python3-pip libudev-dev gcc-arm-none-eabi libffi-dev xterm swig libpcsclite-dev python-is-python3 autoconf libtool python3-venv
```

## Сборка

```bash
git clone --recursive https://github.com/Coldcard/firmware.git ~/coldcard

cd ~/coldcard

git apply unix/linux_addr.patch

python3 -m venv ENV

source ENV/bin/activate

pip install -U pip setuptools

pip install -r requirements.txt

pip install pysdl2-dll

cd unix

pushd ../external/micropython/mpy-cross/

make

popd

make setup

make ngu-setup

make
```

## Запуск эмулятора

```bash
cd ~/coldcard

source ENV/bin/activate

cd unix

./simulator.py
```