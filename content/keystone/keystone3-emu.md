---
title: Эмулятор Keystone 3
weight: 1
---

## Подготовка

- Виртуальная машина VirtualBox с установленным дистрибутивом Ubuntu 22.04 Desktop
- 30 GB для диска виртуальной машины
- 4 GB оперативной памяти
- 4 потока процессора

## Зависимости

```bash
sudo apt install build-essential git python3 python3-pip gcc python-is-python3 python3-venv libsdl2-dev libsdl2-2.0-0 curl

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

. "$HOME/.cargo/env" #не забудьте точку в начале

rustup install nightly-2024-07-01

cargo install cbindgen
```

## Сборка

```bash
git clone https://github.com/KeystoneHQ/keystone3-firmware ~/keystone3-firmware

cd ~/keystone3-firmware

git -c submodule.keystone3-firmware-release.update=none submodule update --init --recursive

pip3 install -r requirements.txt
```

Замените [строку](https://github.com/KeystoneHQ/keystone3-firmware/blob/69cc978cc6b3579294e10d489594fd753d34431b/CMakeLists.txt#L380):

```
      target_link_libraries(${PROJECT_NAME} PRIVATE m dl pthread )
```

в файле CMakeLists.txt в корне репозитория следующим образом:

```
      target_link_libraries(${PROJECT_NAME} PRIVATE m dl pthread xcb )
```

```bash
python3 build.py -o simulator

mv build/simulator simulator

python3 build.py --type btc_only -o simulator

mv build/simulator simulator_btc

python3 build.py --type cypherpunk -o simulator

mv build/simulator simulator_cpunk
```

## Запуск эмулятора

```bash
cd ~/keystone3-firmware

./simulator #эмулятор прошивки Multi-Coin

./simulator_btc #эмулятор прошивки BTC-Only

./simulator_cpunk #эмулятор прошивки Cypherpunk
```