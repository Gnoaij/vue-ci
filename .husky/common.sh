#!/usr/bin/env sh

function chalk_log() {
  echo -e "\033[${2:-36}m${1}\033[0m"
}
