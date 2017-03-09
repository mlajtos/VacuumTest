#!/usr/local/bin/python3
'''Generate and count all solutions to the N-queens problem.

First version.'''

import numpy as np

class Board:
    def __init__(self, size):
        self.board = np.zeros((size, size), dtype=np.int)
        self.solutions = 0

    def __str__(self):
        out = ""
        for row in self.board:
            for col in row:
                if col == -1:
                    char = '\033[91m' + "Q"
                elif col == 0:
                    char = '\033[0m' + "_"
                else:
                    char = '\033[93m' + "*"
                out += char
                out += '\033[0m' +" "
            out += "\n"
        return out

    def add_queen(self, y, x):
        self.board += self.create_mask(y, x, +1)

    def remove_queen(self, y, x):
        self.board += self.create_mask(y, x, -1)

    def create_mask(self, y, x, value = 1):
        diagonal = np.fromfunction(lambda i, j: abs(i - y) == abs(j - x), self.board.shape)
        horizontal = np.fromfunction(lambda i, j: i == y, self.board.shape)
        vertical = np.fromfunction(lambda i, j: j == x, self.board.shape) 
        mask = value * np.logical_or(np.logical_or(horizontal, vertical), diagonal)
        mask[y, x] = -value
        return mask

    def automagically_add_queens(self, queens_left):
        if queens_left == 0:
            self.solutions += 1
            # print(self)
            return
        
        available_mask = (self.board == 0)
        
        # consider only one (following) row
        # otherwise we are counting all permutations separately
        hack = np.zeros(self.board.shape, dtype=np.bool)
        hack[queens_left - self.board.shape[0]] = True
        available_mask = np.logical_and(available_mask, hack)

        available = np.nonzero(available_mask)
        available_length = len(available[0])
        for j in range(available_length):
            self.add_queen(available[0][j], available[1][j])
            self.automagically_add_queens(queens_left - 1)
            self.remove_queen(available[0][j], available[1][j])

if __name__ == "__main__":
    for N in range(1, 11):
        b = Board(N)
        b.automagically_add_queens(N)
        print("N = {N}; C = {C}".format(N = N, C = b.solutions))
