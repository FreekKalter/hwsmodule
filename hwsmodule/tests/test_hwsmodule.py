import unittest

import hwsmodule


class HwsmoduleTestCase(unittest.TestCase):

    def setUp(self):
        self.app = hwsmodule.app.test_client()

    def test_index(self):
        rv = self.app.get('/')
        self.assertIn('Welcome to hwsmodule', rv.data.decode())


if __name__ == '__main__':
    unittest.main()
